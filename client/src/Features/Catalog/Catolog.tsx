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

function Catalog() {
  const [products, setproducts] = useState<product[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    agent.catalog.list
      .then((product) => setproducts(product))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
    console.log("reder use effect in catalog");
  }, []);
  if (loading) return <LoadingComponent message="loading products" />;
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">click</Button>
    </>
  );
}

export default Catalog;
