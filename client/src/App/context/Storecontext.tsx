import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../Models/Basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeitem: (productid: number, quantity: number) => void;
}
export const Storecontext = createContext<StoreContextValue | undefined>(
  undefined
);
//this function is to consume the context and return it or thro error if it is undefind
export function useStorecontext() {
  const context = useContext(Storecontext);
  if (context === undefined) {
    throw Error("cant use this out of store context");
  }
  return context;
}
export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);
  function removeitem(productId: number, quantity: number) {
    if (!basket) return;
    const items = [...basket.items];
    const itemindex = items.findIndex((i) => i.productId === productId);
    if (itemindex >= 0) {
      items[itemindex].quantity -= quantity;
      if (items[itemindex].quantity === 0) items.splice(itemindex, 1);
      setBasket((previousstate) => {
        return { ...previousstate!, items };
      });
    }
  }
  return (
    <Storecontext.Provider value={{ basket, setBasket, removeitem }}>
      {children}
    </Storecontext.Provider>
  );
}
