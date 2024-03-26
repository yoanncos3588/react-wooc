import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { api } from "../services/api/api";
import { LineItem, LineItemLS, LineItemToPOST, Order, OrderToPOST } from "../types/order";
import { useCart } from "./useCart";
import { camelCase } from "change-case/keys";

export const useUpdateOrder = () => {
  const { syncLocalCartWithOrder } = useCart();

  const {
    mutate: editOrderMutation,
    isPending: isPendingEditingOrder,
    isError: isErrorEditingOrder,
    isSuccess: isSuccessEditingOrder,
  } = useMutation({
    mutationFn: ({ orderId, params }: { orderId: number; params: Partial<OrderToPOST> }) => {
      return api.order.edit(orderId, params);
    },
    onSuccess: (data) => {
      syncLocalCartWithOrder(camelCase(data.data, 3) as Order);
      // invalidate query
      queryClient.invalidateQueries({ queryKey: ["getOrder", data.data.id] });
    },
  });

  /**
   * Remove useless data from local cart lines
   * @param {LineItemLS} lineItemLS : cart line items
   * @returns {LineItemToPOST[]} : cart line with essentials data for api
   */
  function cleanLineItemForPOSTandPATCH(lineItemLS: Array<LineItemLS> | Array<LineItem>): Array<LineItemToPOST> {
    return lineItemLS.map((lineItem) => {
      return {
        ...(lineItem.id && { id: lineItem.id }),
        productId: lineItem.productId,
        ...(lineItem.variationId && { variationId: lineItem.variationId }),
        quantity: lineItem.quantity,
      };
    });
  }

  return { editOrderMutation, isPendingEditingOrder, isErrorEditingOrder, isSuccessEditingOrder, cleanLineItemForPOSTandPATCH };
};
