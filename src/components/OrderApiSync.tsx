import { useCart } from "../hooks/useCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderBeforePOST } from "../types/order";
import { FormatedDataResponseType, getUserWPQuery, getCustomerQuery, getOrder } from "../queries";
import { Customer } from "../types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api/api";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

/**
 * Synchronize order whith API, order without id in LocalStorage is considered as a new order
 */
const OrderApiSync = ({ children }: Props) => {
  const { cart, setId } = useCart();
  const [orderNewlyCreated, setOrderNewlyCreated] = useState(false);
  const navigate = useNavigate();

  const { data: dataUser } = useQuery(getUserWPQuery()) as FormatedDataResponseType<{ data: { id: number } }>;
  const { data: dataCustomer } = useQuery(getCustomerQuery(dataUser.data.id)) as FormatedDataResponseType<{ data: Customer }>;
  const { data: dataOrder, isPending: isPendingOrder } = useQuery(getOrder(cart.id)) as FormatedDataResponseType<{ data: Order }>;

  console.log("isLoadingOrder", isPendingOrder);
  console.log("dataOrder", dataOrder);

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: createOrder } = useMutation({
    mutationFn: (order: OrderBeforePOST) => {
      return api.order.create(order);
    },
    onSuccess: (data) => {
      setId(data.data.id);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error: AxiosError<{ code: string; message: string }>) => {
      navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
    },
  });

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: editOrder } = useMutation({
    mutationFn: (cartId: number) => {
      return api.order.edit(cartId, { lineItems: cart.lineItemsLS });
    },
    onSuccess: () => {
      console.log("success edit");
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error: AxiosError<{ code: string; message: string }>) => {
      navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
    },
  });

  /** useEffect to create new order if necessary */
  useEffect(() => {
    const orderToPostDefault: OrderBeforePOST = {
      customerId: dataUser.data.id,
      customerNote: "",
      billing: dataCustomer.data.billing,
      shipping: dataCustomer.data.shipping,
      lineItems: cart.lineItemsLS,
      setPaid: false,
    };
    if (!dataOrder && !isPendingOrder) {
      console.log("mutate", dataOrder);
      // order is not existing in the BO, then create a new one
      createOrder(orderToPostDefault);
      setOrderNewlyCreated(true);
    }
  }, [cart.lineItemsLS, createOrder, dataCustomer.data.billing, dataCustomer.data.shipping, dataUser.data.id, dataOrder, isPendingOrder]);

  /** useEffect to update order line items in BO */
  useEffect(() => {
    if (dataOrder && !orderNewlyCreated && !isPendingOrder) {
      editOrder(dataOrder.data.id);
    }
  }, [dataOrder, editOrder, isPendingOrder, orderNewlyCreated]);

  return children;
};

export default OrderApiSync;
