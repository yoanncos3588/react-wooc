import { useEffect, useState } from "react";
import { Product, ProductVariation } from "../types/products";
import { LineItemLS } from "../types/Order";

const localStorageKey = "cart";

export const useCart = () => {
  const [cart, setCart] = useState<Array<LineItemLS>>(localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)!) : []);
  const [response, setResponse] = useState<string>();

  // keep local storage up to date with cart
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  function add(product: Product, variation: ProductVariation | undefined = undefined) {
    const lineItemLS = buildLineItem(product, variation);
    const isItemInCart = !!findItemInCart(product.id, variation?.id);
    setResponse(isItemInCart ? "Ce produit est déjà dans votre panier" : "Produit ajouté au panier");
    setCart((prev) => (isItemInCart ? prev : [...prev, lineItemLS]));
  }

  function remove(productId: number, variationId: number | undefined = undefined) {
    setResponse("Produit supprimé du panier");
    setCart((prev) => prev.filter((lineItem) => !isProductOrVariation(lineItem, productId, variationId)));
  }

  function updateQuantity(productId: number, variationId: number | undefined = undefined, quantity: number) {
    setCart((prev) => {
      return prev.map((lineItem) => {
        if (isProductOrVariation(lineItem, productId, variationId)) {
          return { ...lineItem, quantity: quantity };
        } else {
          return lineItem;
        }
      });
    });
  }

  function emptyCart() {
    setCart([]);
  }

  /**
   * find item in current cart
   */
  function findItemInCart(productId: number, variationId: number | undefined = undefined): LineItemLS | undefined {
    return cart.find((lineItem) => isProductOrVariation(lineItem, productId, variationId));
  }

  /**
   * test if productId match the lineItem productId and the product variation id
   */
  function isProductOrVariation(lineItem: LineItemLS, productIdToFind: number, variationIdToFind: number | undefined = undefined): boolean {
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
      total: calculPrice(variation ? variation : product, 1),
      ...(variation && { variationId: variation.id }),
    };
  }

  /**
   * Calcul price only for FO before checkout, final prices are calculated when order is created in BO
   */
  function calculPrice(product: Product | ProductVariation, quantity: number): string {
    return (Number(product.price) * quantity).toFixed(2);
  }

  return { cart, response, add, remove, updateQuantity, emptyCart, findItemInCart };
};
