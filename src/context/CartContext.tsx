import { createContext, useEffect, useState } from "react";
import { LineItemLS, OrderLS } from "../types/order";
import { Product, ProductVariation } from "../types/products";

export const CartContext = createContext<CartProviderValue>({} as CartProviderValue);

const localStorageKey = "cart";

interface CartProviderValue {
  cart: OrderLS;
  response: string | undefined;
  add: (product: Product, variation: ProductVariation | undefined) => void;
  remove: (productId: number, variationId: number | undefined) => void;
  updateQuantity: (lineItemToUpdate: LineItemLS, quantity: number) => void;
  emptyCart: () => void;
  findItemInCart: (productId: number, variationId: number | undefined) => LineItemLS | undefined;
  getTotalPrice: () => string;
}

interface Props {
  children: React.ReactNode;
}

const cartDefaultValue: OrderLS = { id: null, lineItemsLS: [] };

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<OrderLS>(localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)!) : cartDefaultValue);
  const [response, setResponse] = useState<string>();

  // keep local storage up to date with cart
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  function add(product: Product, variation: ProductVariation | undefined = undefined) {
    const lineItemLS = buildLineItem(product, variation);
    const isItemInCart = !!findItemInCart(product.id, variation?.id);
    setResponse(isItemInCart ? "Ce produit est déjà dans votre panier" : "Produit ajouté au panier");
    setCart((prev) => (isItemInCart ? prev : { ...prev, lineItemsLS: [...prev.lineItemsLS, lineItemLS] }));
  }

  function remove(productId: number, variationId: number | undefined = undefined) {
    setResponse("Produit supprimé du panier");
    const lineItems = cart.lineItemsLS;
    const filteredLineItems = lineItems.filter((lineItem) => !matchProductIdAndVariationId(lineItem, productId, variationId));
    setCart((prev) => {
      return { ...prev, lineItemsLS: filteredLineItems };
    });
  }

  function updateQuantity(lineItemToUpdate: LineItemLS, quantity: number) {
    setCart((prev) => {
      const updatedLineItems = cart.lineItemsLS.map((lineItem) => {
        if (matchProductIdAndVariationId(lineItem, lineItemToUpdate.productId, lineItemToUpdate.variationId)) {
          return { ...lineItem, quantity: quantity, total: calculPrice(lineItem.price, quantity) };
        } else {
          return lineItem;
        }
      });
      return { ...prev, lineItemsLS: updatedLineItems };
    });
  }

  function emptyCart() {
    setCart(cartDefaultValue);
  }

  function getTotalPrice() {
    const totalPrice = cart.lineItemsLS
      .map((lineItem) => Number(lineItem.total))
      .reduce((total, price) => {
        return total + price;
      }, 0);
    return totalPrice.toFixed(2);
  }

  /**
   * find item in current cart
   */
  function findItemInCart(productId: number, variationId: number | undefined = undefined): LineItemLS | undefined {
    return cart.lineItemsLS.find((lineItem) => matchProductIdAndVariationId(lineItem, productId, variationId));
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
  function buildLineItem(product: Product, variation: ProductVariation | undefined = undefined): LineItemLS {
    return {
      name: product.name,
      productId: product.id,
      quantity: 1,
      slug: product.slug,
      price: variation ? variation.price : product.price,
      total: calculPrice(variation ? variation.price : product.price, 1),
      variationId: variation?.id,
      attributes: variation?.attributes,
      imageUrl: variation ? (variation.image ? variation.image.src : undefined) : product.images[0] ? product.images[0].src : undefined,
    };
  }

  /**
   * Calcul price only for FO before checkout, final prices are calculated when order is created in BO
   */
  function calculPrice(price: string, quantity: number): string {
    return (Number(price) * quantity).toFixed(2);
  }
  return (
    <CartContext.Provider value={{ cart, response, add, remove, updateQuantity, emptyCart, findItemInCart, getTotalPrice }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
