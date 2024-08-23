export interface Order {
  id: number;
  buyerId: string;
  shippingAdress: ShippingAdress;
  orderDate: string;
  orederItems: OrederItem[];
  subTotal: number;
  deleveryFee: number;
  orderStatus: string;
  total: number;
}

export interface ShippingAdress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrederItem {
  productId: number;
  name: string;
  pictureURL: string;
  price: number;
  quantity: number;
}
