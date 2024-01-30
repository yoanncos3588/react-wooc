export interface ProductCategorie {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: ProductCategorieImage;
  menuOrder: number;
  count: number;
}

export interface ProductCategorieImage {
  id: number;
  dateCreated: string;
  dateCreatedGmt: string;
  dateModified: string;
  dateModifiedGmt: string;
  src: string;
  name: string;
  alt: string;
}
