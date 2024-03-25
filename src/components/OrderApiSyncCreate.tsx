import { useCart } from "../hooks/useCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderToPOST } from "../types/order";
import { FormatedDataResponseType, getUserWPQuery, getCustomerQuery } from "../queries";
import { Customer } from "../types/user";
import { ReactNode, useEffect } from "react";
import { api } from "../services/api/api";
import { useNavigate } from "react-router-dom";
import { camelCase } from "change-case/keys";
import { useUpdateOrder } from "../hooks/useUpdateOrder";
import Loading from "./Loading";

interface Props {
  children: ReactNode;
}

/**
 * Guard component for creating an order if cart dont have an order ID when entering ordering tunnel
 */
const OrderApiSyncCreate = ({ children }: Props) => {
  const { cart, syncLocalCartWithOrder } = useCart();
  const { cleanLineItemForPOSTandPATCH } = useUpdateOrder();
  const navigate = useNavigate();

  const { data: dataUser } = useQuery(getUserWPQuery()) as FormatedDataResponseType<{ data: { id: number } }>;
  const { data: dataCustomer } = useQuery(getCustomerQuery(dataUser.data.id)) as FormatedDataResponseType<{ data: Customer }>;

  // use destructuring because useMutation returned object change every response, causing rerendering loop in useEffect
  const {
    mutate: createOrder,
    isPending: isPendingCreateOrder,
    isError: isErrorCreateOrder,
    isSuccess: isSuccessCreateOrder,
  } = useMutation({
    mutationFn: (order: OrderToPOST) => {
      return api.order.create(order);
    },
    onSuccess: (data) => {
      syncLocalCartWithOrder(camelCase(data.data, 3) as Order);
    },
  });

  useEffect(() => {
    if (!cart.id && !isPendingCreateOrder && !isSuccessCreateOrder && !isErrorCreateOrder) {
      const orderToPostDefault: OrderToPOST = {
        customerId: dataUser.data.id,
        customerNote: "",
        billing: dataCustomer.data.billing,
        shipping: dataCustomer.data.shipping,
        lineItems: cleanLineItemForPOSTandPATCH(cart.lineItems),
        setPaid: false,
      };
      // order not existing in BO, so create a new one
      createOrder(orderToPostDefault);
    }
  }, [
    cart.id,
    cart.lineItems,
    cleanLineItemForPOSTandPATCH,
    createOrder,
    dataCustomer.data.billing,
    dataCustomer.data.shipping,
    dataUser.data.id,
    isPendingCreateOrder,
    isSuccessCreateOrder,
    isErrorCreateOrder,
  ]);

  if (isPendingCreateOrder) {
    return <Loading />;
  }

  if (isErrorCreateOrder) {
    navigate("/cart", { state: { errorMessage: "Une erreur est survenue pendant la création de la commande" } });
  }

  return children;
};

export default OrderApiSyncCreate;
