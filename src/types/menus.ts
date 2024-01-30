export interface MenuItems {
  id: number;
  title: {
    rendered: string;
  };
  status: string;
  url: string;
  object: string;
  objectId: number;
  parent: number;
  menuOrder: number;
  childrens: MenuItems[];
}
