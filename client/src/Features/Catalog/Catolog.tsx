import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
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
import {
  FetchFilter,
  fetchproductsasync,
  productselector,
  setpagenumber,
  setproductprams,
} from "./CatalogSlice";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../App/component/RadioButtonGroup";
import CheckBoxButton from "../../App/component/CheckBoxButton";
import AppPagination from "../../App/component/AppPagination";
const sortoptions = [
  { value: "name", lable: "Alphapetical" },
  { value: "priceDes", lable: "price-high to low" },
  { value: "price", lable: "price-low to high" },
];
function Catalog() {
  const products = useappselectore(productselector.selectAll);
  const {
    productloaded,
    status,
    filtersloaded,
    brands,
    Types,
    productparams,
    metadata,
  } = useappselectore((state) => state.catalog);
  const dispatch = useappdispatch();
  useEffect(() => {
    if (!productloaded) dispatch(fetchproductsasync());
  }, [productloaded, dispatch]);
  useEffect(() => {
    if (!filtersloaded) dispatch(FetchFilter());
  }, [dispatch, filtersloaded]);
  if (!filtersloaded) return <LoadingComponent message="loading products" />;

  return (
    <Grid container culumn-spacing={3} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2, mr: 4 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, mr: 4, p: 2 }}>
          <RadioButtonGroup
            selectedvalue={productparams.OrederBy}
            onchange={(event) =>
              dispatch(setproductprams({ OrederBy: event.target.value }))
            }
            sortoption={sortoptions}
          />
        </Paper>
        <Paper sx={{ mb: 2, mr: 4, p: 2 }}>
          <CheckBoxButton
            items={brands}
            checked={productparams.Brands}
            onchange={(items: string[]) =>
              dispatch(setproductprams({ Brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, mr: 4, p: 2 }}>
          <CheckBoxButton
            items={Types}
            checked={productparams.Types}
            onchange={(items: string[]) =>
              dispatch(setproductprams({ Types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metadata && (
          <AppPagination
            MetaData={metadata}
            onpagechange={(page) => {
              dispatch(setpagenumber({ PageNumber: page }));
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Catalog;
