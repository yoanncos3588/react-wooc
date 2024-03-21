import { LocationInfos, ShippingInfos } from "./billingShipping";
import { VariationAttributes } from "./products";

export interface OrderLS {
  id: number | null;
  lineItemsLS: Array<LineItemLS>;
}

export interface OrderBeforePOST {
  customerId: number;
  customerNote: string;
  billing: LocationInfos;
  shipping: ShippingInfos;
  lineItemsLS: Array<LineItemLS>;
  setPaid: boolean;
}

export interface Order extends Omit<OrderBeforePOST, "lineItemsLS"> {
  id: number;
  parentId: number;
  number: string;
  orderKey: string;
  createdVia: string;
  version: string;
  status: string;
  currency: string;
  dateCreated: Date;
  dateModified: Date;
  discountTotal: string;
  discountTax: string;
  shippingTotal: string;
  shippingTax: string;
  cartTax: string;
  total: string;
  totalTax: string;
  princesIncludeTax: boolean;
  paymentMethod: string;
  paymentMethodTitle: string;
  datePaid: Date;
  cartHash: string;
  metaData: Array<MetaData>;
  lineItems: Array<LineItem>;
  taxLines: Array<Taxe>;
  shippingLines: Array<ShippingLine>;
}

export interface LineItemLS {
  name: string;
  productId: number;
  variationId?: number | undefined;
  slug: string;
  price: string;
  quantity: number;
  total: string;
  attributes: VariationAttributes[] | undefined;
  imageUrl: string | undefined;
}

export interface LineItem extends LineItemLS {
  id: number;
  taxClass: string;
  subtotal: string;
  subtotalTax: string;
  totalTax: string;
  taxes: Array<Taxe>;
  meta_data: Array<MetaData>;
  sku: string;
  price: string;
}

export interface MetaData {
  id: number;
  key: string;
  value: string;
}

export interface Taxe {
  id: number;
  rateCode: string;
  rateId: string;
  label: string;
  compound: boolean;
  taxTotal: string;
  shippingTaxTotal: string;
  metaData: Array<MetaData>;
}

export interface ShippingLine {
  id: number;
  methodTitle: string;
  methodId: string;
  total: string;
  totalTax: string;
  taxes: Array<Taxe>;
  metaData: Array<MetaData>;
}
