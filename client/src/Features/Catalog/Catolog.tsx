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

function Catalog() {
  const [products, setproducts] = useState<product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7031/Product")
      .then((response) => response.json())
      .then((data) => setproducts(data));
    console.log("reder use effect");
  }, []);

  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">click</Button>
    </>
  );
}

export default Catalog;
