export interface product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quentityInStock: number;
}
export interface ProductParams {
  OrederBy: string;
  Searchterm?: string;
  Types: string[];
  Brands: string[];
  PageNumber: number;
  PageSize: number;
}
