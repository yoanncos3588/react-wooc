import { useCart } from "../hooks/useCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderToPOST } from "../types/order";
import { FormatedDataResponseType, getUserWPQuery, getCustomerQuery } from "../queries";
import { Customer } from "../types/user";
import { AxiosError } from "axios";
import { ReactNode, useEffect } from "react";
import { api } from "../services/api/api";
import { useNavigate } from "react-router-dom";
import { camelCase } from "change-case/keys";

interface Props {
  children: ReactNode;
}

const OrderApiSyncCreate = ({ children }: Props) => {
  const { cart, syncLocalCartAndOrder, cleanLineItemForPOSTandPATCH } = useCart();
  const navigate = useNavigate();

  const { data: dataUser } = useQuery(getUserWPQuery()) as FormatedDataResponseType<{ data: { id: number } }>;
  const { data: dataCustomer } = useQuery(getCustomerQuery(dataUser.data.id)) as FormatedDataResponseType<{ data: Customer }>;

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const { mutate: createOrder } = useMutation({
    mutationFn: (order: OrderToPOST) => {
      return api.order.create(order);
    },
    onSuccess: (data) => {
      syncLocalCartAndOrder(camelCase(data.data, 3) as Order);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error: AxiosError<{ code: string; message: string }>) => {
      navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la génération de la commande" } });
    },
  });

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
      // order not existing in the BO, so create a new one
      createOrder(orderToPostDefault);
    }
  }, [cart.id, cart.lineItems, cleanLineItemForPOSTandPATCH, createOrder, dataCustomer.data.billing, dataCustomer.data.shipping, dataUser.data.id]);

  return children;
};

export default OrderApiSyncCreate;
