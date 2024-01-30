import { ProductCategorie } from "./categories";

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  dateCreated: string;
  dateModified: string;
  type: string;
  status: string;
  featured: boolean;
  catalogVisibility: string;
  description: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  dateOnSaleFrom: string;
  dateOnSaleTo: string;
  priceHtml: string;
  onSale: boolean;
  purchasable: boolean;
  totalSales: number;
  virtual: boolean;
  taxStatus: string;
  taxClass: string;
  stockQuantity: number;
  stockStatus: string;
  weight: string;
  averageRating: string;
  ratingCount: number;
  relatedIds: Array<number>;
  parentId: number;
  categories: Array<ProductCategorie>;
  tags: Array<ProductTags>;
  images: Array<ProductImages>;
  attributes: Array<ProductAttributes>;
  variations: Array<number>;
  crossSellIds: Array<number>;
}

export interface ProductTags {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImages {
  id: number;
  dateCreated: string;
  dateModified: string;
  src: string;
  name: string;
  alt: string;
}

export interface ProductAttributes {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: Array<string>;
}

export interface VariationAttributes {
  id: number;
  name: string;
  option: string;
}

export interface ProductVariation
  extends Omit<
    Product,
    | "attributes"
    | "type"
    | "featured"
    | "catalogVisibility"
    | "shortDescription"
    | "totalSales"
    | "relatedIds"
    | "categories"
    | "tags"
    | "images"
    | "variations"
    | "crossSellIds"
  > {
  image: ProductImages;
  attributes: VariationAttributes[];
}
