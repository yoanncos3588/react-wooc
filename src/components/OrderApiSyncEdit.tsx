import { useCart } from "../hooks/useCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "../types/order";
import { FormatedDataResponseType, getOrder } from "../queries";
import { AxiosError } from "axios";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../services/api/api";
import { camelCase } from "change-case/keys";
import isEqual from "lodash.isequal";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}
const OrderApiSyncEdit = ({ children }: Props) => {
  const { cart, syncLocalCartAndOrder, cleanLineItemForPOSTandPATCH } = useCart();
  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;
  const navigate = useNavigate();

  // Flag to indicate whether syncLocalCartAndOrder is in progress
  const [isSyncing, setIsSyncing] = useState(false);

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: editOrder, isPending: editIsPending } = useMutation({
    mutationFn: (cartId: number) => {
      return api.order.edit(cartId, { lineItems: cleanLineItemForPOSTandPATCH(cart.lineItems) });
    },
    onSuccess: (data) => {
      // invalid query order
      queryClient.invalidateQueries({ queryKey: ["getOrder", cart.id] });
      syncLocalCartAndOrder(camelCase(data.data, 3) as Order);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error: AxiosError<{ code: string; message: string }>) => {
      navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
    },
  });

  /**
   * Test if line items in current cart and order are equals, meaning sync is done
   */
  const cartAndOrderLineItemsEquals = useCallback(() => {
    const dataOrderCamel = camelCase(dataOrder.data, 3) as Order;
    const currentLineItems = cleanLineItemForPOSTandPATCH(cart.lineItems);
    const orderLineItems = cleanLineItemForPOSTandPATCH(dataOrderCamel.lineItems);
    return isEqual(currentLineItems, orderLineItems);
  }, [cart.lineItems, cleanLineItemForPOSTandPATCH, dataOrder?.data]);

  /** useEffect to update order line items in BO */
  useEffect(() => {
    if (cart.id && !isPendingOrder && !editIsPending) {
      // order is loaded
      if (!isSyncing && cartAndOrderLineItemsEquals()) {
        setIsSyncing(true);
        editOrder(cart.id);
      }
    }
  }, [cart.id, cartAndOrderLineItemsEquals, editIsPending, editOrder, isPendingOrder, isSyncing]);

  /** useEffect for sync state status */
  useEffect(() => {
    if (isSyncing) {
      if (cartAndOrderLineItemsEquals()) {
        setIsSyncing(false);
      }
    }
  }, [cart, cartAndOrderLineItemsEquals, isSyncing]);

  return children;
};

export default OrderApiSyncEdit;
