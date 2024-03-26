import { createContext, useEffect, useState } from "react";
import { LineItemLS, Order, OrderLS } from "../types/order";
import { Product, ProductVariation, VariationAttributes } from "../types/products";

export const CartContext = createContext<CartProviderValue>({} as CartProviderValue);

const localStorageKey = "cart";

interface CartProviderValue {
  cart: OrderLS;
  response: string | undefined;
  add: (product: Product, variation: ProductVariation | undefined) => void;
  updateQuantity: (lineItemToUpdate: LineItemLS, quantity: number) => void;
  emptyCart: () => void;
  findItemInCart: (productId: number, variationId: number | undefined) => LineItemLS | undefined;
  getTotalPrice: () => string;
  syncLocalCartWithOrder: (Order: Order) => void;
  getTotalProducts: () => number;
}

interface Props {
  children: React.ReactNode;
}

const cartDefaultValue: OrderLS = { lineItems: [] };

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<OrderLS>(localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)!) : cartDefaultValue);
  const [response, setResponse] = useState<string>();

  // keep local storage up to date with cart
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  /**
   * Add product to cart
   * @param {Product} product
   * @param {ProductVariation} variation : optional variation of product
   */
  function add(product: Product, variation: ProductVariation | undefined = undefined) {
    const lineItemLS = buildLineItemLS(
      product.name,
      product.id,
      1,
      product.slug,
      variation ? Number(variation.price) : Number(product.price),
      undefined,
      undefined,
      variation && variation.id,
      variation && variation.attributes,
      variation ? variation.image && variation.image.src : product.images[0] && product.images[0].src
    );
    const isItemInCart = !!findItemInCart(product.id, variation?.id);
    setResponse(isItemInCart ? "Ce produit est déjà dans votre panier" : "Produit ajouté au panier");
    setCart((prev) => (isItemInCart ? prev : { ...prev, lineItems: [...prev.lineItems, lineItemLS] }));
  }

  /**
   * Update product line quantity, product with a quantity of 0 will be deleted during BO sync
   * @param {LineItemLS} lineItemToUpdate : cart line to update
   * @param {number} quantity
   */
  function updateQuantity(lineItemToUpdate: LineItemLS, quantity: number) {
    setCart((prev) => {
      const updatedLineItems = cart.lineItems.map((lineItem) => {
        if (matchProductIdAndVariationId(lineItem, lineItemToUpdate.productId, lineItemToUpdate.variationId)) {
          return { ...lineItem, quantity: quantity, total: calculPrice(lineItem.price, quantity) };
        } else {
          return lineItem;
        }
      });
      return { ...prev, lineItems: updatedLineItems };
    });
  }

  /**
   * Sync order cart from BO to FO cart
   * @param {Order} order : Order fetched from WC BO
   */
  function syncLocalCartWithOrder(order: Order) {
    const lineItemsLS = order.lineItems.map((lineItem) => {
      return buildLineItemLS(
        lineItem.name,
        lineItem.productId,
        lineItem.quantity,
        lineItem.slug,
        Number(lineItem.price),
        lineItem.id,
        lineItem.total,
        lineItem.variationId && lineItem.variationId,
        lineItem.attributes && lineItem.attributes,
        lineItem.image && lineItem.image.src
      );
    });
    setCart({ id: order.id, lineItems: lineItemsLS });
  }

  function emptyCart() {
    setCart(cartDefaultValue);
  }

  function getTotalPrice() {
    const totalPrice = cart.lineItems
      .map((lineItem) => Number(lineItem.total))
      .reduce((total, price) => {
        return total + price;
      }, 0);
    return totalPrice.toFixed(2);
  }

  /**
   * Get total number of products in cart
   * @returns {number} number of line item in cart excluding line item with 0 quantity
   */
  function getTotalProducts(): number {
    return cart.lineItems.filter((lineItem) => lineItem.quantity > 0).length;
  }

  /**
   * find item in current cart
   */
  function findItemInCart(productId: number, variationId: number | undefined = undefined): LineItemLS | undefined {
    return cart.lineItems.find((lineItem) => matchProductIdAndVariationId(lineItem, productId, variationId));
  }

  /**
   * test if productId match the lineItem productId and the product variation id
   */
  function matchProductIdAndVariationId(lineItem: LineItemLS, productIdToFind: number, variationIdToFind: number | undefined = undefined): boolean {
    return variationIdToFind ? variationIdToFind === lineItem.variationId && productIdToFind === lineItem.productId : productIdToFind === lineItem.productId;
  }

  /**
   * Build cart item from product and variation
   */
  function buildLineItemLS(
    name: string,
    productId: number,
    quantity: number = 1,
    slug: string,
    price: number,
    lineId?: number,
    total?: string,
    variationId?: number,
    attributes?: VariationAttributes[],
    image?: string
  ): LineItemLS {
    return {
      name,
      productId,
      quantity,
      slug,
      price,
      id: lineId,
      total: total ? total : calculPrice(price, quantity),
      variationId: variationId && variationId !== 0 ? variationId : undefined,
      attributes: attributes,
      image: image && image !== "" ? { src: image } : undefined,
    };
  }

  /**
   * Calcul price only for FO before checkout, final prices are calculate during order creation in BO
   */
  function calculPrice(price: number, quantity: number): string {
    return (Number(price) * Number(quantity)).toFixed(2);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        response,
        add,
        updateQuantity,
        emptyCart,
        findItemInCart,
        getTotalPrice,
        syncLocalCartWithOrder,
        getTotalProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
