import { useCart } from "../hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../types/order";
import { FormatedDataResponseType, getOrder } from "../queries";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { camelCase } from "change-case/keys";
import isEqual from "lodash.isequal";
import { useUpdateOrder } from "../hooks/useUpdateOrder";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

interface Props {
  children: ReactNode;
}

/**
 * Guard component to keep cart line items and order sync when entering ordering tunnel
 */
const OrderApiSyncEdit = ({ children }: Props) => {
  const { cart } = useCart();
  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;

  const { editOrderMutation: editOrder, isPendingEditingOrder, isErrorEditingOrder, cleanLineItemForPOSTandPATCH } = useUpdateOrder();

  const navigate = useNavigate();

  // Flag to indicate whether syncLocalCartAndOrder is in progress
  const [isWrittingLS, setIsWrittingLS] = useState(false);

  /**
   * Test if line items in current cart and order are equals, meaning sync is done or nothing has changed
   */
  const isCartAndOrderLineItemsEquals = useCallback(() => {
    const dataOrderCamel = camelCase(dataOrder.data, 3) as Order;
    const currentLineItems = cleanLineItemForPOSTandPATCH(cart.lineItems);
    const orderLineItems = cleanLineItemForPOSTandPATCH(dataOrderCamel.lineItems);
    return isEqual(currentLineItems, orderLineItems);
  }, [cart.lineItems, cleanLineItemForPOSTandPATCH, dataOrder?.data]);

  /** useEffect to update order line items in BO */
  useEffect(() => {
    if (cart.id && !isPendingOrder && !isPendingEditingOrder) {
      console.log("order is loaded");
      // order is loaded
      if (!isWrittingLS && !isCartAndOrderLineItemsEquals()) {
        console.log("start edit order");
        // localstorage is not being written and local cart and distant order dont have the same items
        setIsWrittingLS(true);
        editOrder({ cartId: cart.id, params: { lineItems: cleanLineItemForPOSTandPATCH(cart.lineItems) } });
      }
    }
  }, [cart.id, cart.lineItems, cleanLineItemForPOSTandPATCH, editOrder, isCartAndOrderLineItemsEquals, isPendingEditingOrder, isPendingOrder, isWrittingLS]);

  /** useEffect for sync state status */
  useEffect(() => {
    if (isWrittingLS) {
      if (isCartAndOrderLineItemsEquals()) {
        // localstorage is being written and local cart is equal distant order
        setIsWrittingLS(false);
      }
    }
  }, [cart, isCartAndOrderLineItemsEquals, isWrittingLS]);

  if (isPendingEditingOrder) {
    return <Loading />;
  }

  if (isErrorEditingOrder) {
    navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
  }

  return children;
};

export default OrderApiSyncEdit;
