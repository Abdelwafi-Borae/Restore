import { Basket } from "./Basket";

export interface User {
  email: string;
  token: string;
  Basket?: Basket;
}
