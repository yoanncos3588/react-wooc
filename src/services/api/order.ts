import { Order, OrderToPOST } from "../../types/order";
import { axiosInstanceWoo } from "./api";
import { snakeCase } from "change-case/keys";

type EditOrderParams<T> = Partial<T>;

const order = {
  create: async (order: OrderToPOST) => {
    return await axiosInstanceWoo.post("/orders", snakeCase(order, 3));
  },
  edit: async (orderId: number, params: EditOrderParams<Order>) => {
    return await axiosInstanceWoo.patch(`/orders/${orderId}`, snakeCase(params, 2));
  },
  delete: async (orderId: number) => {
    return await axiosInstanceWoo.delete(`/orders/${orderId}`);
  },
  get: async (orderId: number) => {
    return await axiosInstanceWoo.get(`/orders/${orderId}`);
  },
};

export default order;
