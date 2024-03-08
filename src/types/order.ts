import { LocationInfos, ShippingInfos } from "./billingShipping";

export interface Order {
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
  customerId: number;
  customerNote: string;
  billing: LocationInfos;
  shipping: ShippingInfos;
  paymentMethod: string;
  paymentMethodTitle: string;
  datePaid: Date;
  cartHash: string;
  metaData: Array<MetaData>;
  lineItems: Array<LineItem>;
  taxLines: Array<Taxe>;
  shippingLines: Array<ShippingLine>;
  setPaid: boolean;
}

export interface LineItem {
  id: number;
  name: string;
  productId: number;
  variationId?: number;
  quantity: number;
  taxClass: string;
  subtotal: string;
  subtotalTax: string;
  total: string;
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
