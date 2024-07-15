import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { product } from "../../App/Models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../App/API/agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import {
  useappdispatch,
  useappselectore,
} from "../../App/store/configureStore";
import { fetchproductsasync, productselector } from "./CatalogSlice";

function Catalog() {
  const products = useappselectore(productselector.selectAll);
  const { productloaded, status } = useappselectore((state) => state.catalog);
  const dispatch = useappdispatch();
  useEffect(() => {
    if (!productloaded) dispatch(fetchproductsasync());
  }, []);
  if (status.includes("pending"))
    return <LoadingComponent message="loading products" />;
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">click</Button>
    </>
  );
}

export default Catalog;
