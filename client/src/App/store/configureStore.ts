import { configureStore } from "@reduxjs/toolkit";
import { counterslice } from "../../Features/contact/counterslice";
import { useDispatch } from "react-redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { basketslice } from "../../Features/Basket/Bsketslice";
import Catalog from "../../Features/Catalog/Catolog";
import { catalogslice } from "../../Features/Catalog/CatalogSlice";

export const store = configureStore({
  reducer: {
    counterr: counterslice.reducer,
    basket: basketslice.reducer,
    catalog: catalogslice.reducer,
  },
});

export type rootstate = ReturnType<typeof store.getState>;
export type appdispatch = typeof store.dispatch;
export const useappdispatch = () => useDispatch<appdispatch>();
export const useappselectore: TypedUseSelectorHook<rootstate> = useSelector;
