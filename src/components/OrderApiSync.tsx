import { useCart } from "../hooks/useCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LineItem, LineItemLS, LineItemToPOST, Order, OrderToPOST } from "../types/order";
import { FormatedDataResponseType, getUserWPQuery, getCustomerQuery, getOrder } from "../queries";
import { Customer } from "../types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api/api";
import { useNavigate } from "react-router-dom";
import { camelCase } from "change-case/keys";
import isEqual from "lodash.isequal";
import { queryClient } from "../main";

interface Props {
  children: React.ReactNode;
}

/**
 * Synchronize order whith API, order without id in LocalStorage is considered as a new order
 */
const OrderApiSync = ({ children }: Props) => {
  const { cart, syncLocalCartAndOrder } = useCart();
  const [orderNewlyCreated, setOrderNewlyCreated] = useState(false);
  const navigate = useNavigate();

  const { data: dataUser } = useQuery(getUserWPQuery()) as FormatedDataResponseType<{ data: { id: number } }>;
  const { data: dataCustomer } = useQuery(getCustomerQuery(dataUser.data.id)) as FormatedDataResponseType<{ data: Customer }>;
  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;

  const order = !isPendingOrder ? (camelCase(dataOrder.data, 3) as Order) : undefined;

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: createOrder } = useMutation({
    mutationFn: (order: OrderToPOST) => {
      return api.order.create(order);
    },
    onSuccess: (data) => {
      console.log("success : ready to sync");
      syncLocalCartAndOrder(camelCase(data.data, 3) as Order);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error: AxiosError<{ code: string; message: string }>) => {
      console.log("error trigerred", error);
      navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
    },
  });

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: editOrder } = useMutation({
    mutationFn: (cartId: number) => {
      return api.order.edit(cartId, { lineItems: cleanLineItemForPOSTandPATCH(cart.lineItems) });
    },
    onSuccess: (data) => {
      console.log("success edit", data.data);
      syncLocalCartAndOrder(camelCase(data.data, 3) as Order);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error: AxiosError<{ code: string; message: string }>) => {
      console.log("error edit", _error);
      // navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
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

  /** useEffect to create new order if necessary */
  useEffect(() => {
    const orderToPostDefault: OrderToPOST = {
      customerId: dataUser.data.id,
      customerNote: "",
      billing: dataCustomer.data.billing,
      shipping: dataCustomer.data.shipping,
      lineItems: cleanLineItemForPOSTandPATCH(cart.lineItems),
      setPaid: false,
    };
    if (!cart.id) {
      console.log("mutate", dataOrder);
      // order not existing in the BO, so create a new one
      createOrder(orderToPostDefault);
      setOrderNewlyCreated(true);
    }
  }, [cart.id, cart.lineItems, createOrder, dataCustomer.data.billing, dataCustomer.data.shipping, dataUser.data.id, dataOrder, isPendingOrder]);

  /** useEffect to update order line items in BO */
  useEffect(() => {
    if (cart.id && !orderNewlyCreated) {
      // ignore new order on rerender after create
      if (!isPendingOrder && order) {
        // order is loaded
        const currentLineItems = cleanLineItemForPOSTandPATCH(cart.lineItems);
        const orderLineItems = cleanLineItemForPOSTandPATCH(order.lineItems);
        if (!isEqual(currentLineItems, orderLineItems)) {
          editOrder(cart.id);
          setOrderNewlyCreated(true);
          queryClient.invalidateQueries({ queryKey: ["getOrder", cart.id] });
        }
      }
    }
  }, [cart.id, cart.lineItems, editOrder, order, orderNewlyCreated, isPendingOrder]);

  return children;
};

export default OrderApiSync;
