import { debounce, TextField } from "@mui/material";
import {
  useappselectore,
  useappdispatch,
} from "../../App/store/configureStore";
import { setproductprams } from "./CatalogSlice";
import { useState } from "react";

function ProductSearch() {
  const { productparams } = useappselectore((state) => state.catalog);
  const [SearchTerm, setSearchTerm] = useState(productparams.Searchterm);
  const dispatch = useappdispatch();
  const debouncesearch = debounce((event) => {
    dispatch(setproductprams({ Searchterm: event.target.value }));
  }, 1000);
  return (
    <TextField
      label="Search Product"
      variant="outlined"
      fullWidth
      value={SearchTerm || ""}
      onChange={(event) => {
        debouncesearch(event);
        setSearchTerm(event.currentTarget.value);
      }}
    />
  );
}

export default ProductSearch;
