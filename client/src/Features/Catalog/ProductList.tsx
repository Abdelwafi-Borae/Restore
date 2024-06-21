import { Grid } from "@mui/material";
import { product } from "../../App/Models/product";
import ProductCard from "./ProductCard";

interface props {
  products: product[];
}
function ProductList({ products }: props) {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((item) => (
          <Grid item xs={3} key={item.id}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
