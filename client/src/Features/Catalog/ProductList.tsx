import { Grid } from "@mui/material";
import { product } from "../../App/Models/product";
import ProductCard from "./ProductCard";
import ProductCardScelton from "./ProductCardScelton";
import { useappselectore } from "../../App/store/configureStore";

interface props {
  products: product[];
}
function ProductList({ products }: props) {
  const { productloaded } = useappselectore((state) => state.catalog);
  // if (!filtersloaded) return <ProductCardScelton />;
  return (
    <>
      <Grid container spacing={4}>
        {products.map((item) => (
          <Grid item xs={4} key={item.id}>
            {!productloaded ? (
              <ProductCardScelton />
            ) : (
              <ProductCard product={item} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
