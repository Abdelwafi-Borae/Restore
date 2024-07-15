import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { product } from "../../App/Models/product";
import agent from "../../App/API/agent";
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { cerruncyformat } from "../../App/util/util";
import { LoadingButton } from "@mui/lab";
import {
  useappdispatch,
  useappselectore,
} from "../../App/store/configureStore";
import {
  addbasketitemasync,
  removebasketitemasync,
  setbasket,
} from "../Basket/Bsketslice";
import { fetchproductasync, productselector } from "./CatalogSlice";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = useappselectore((state) =>
    productselector.selectById(state, Number(id))
  );
  const { status: productstate } = useappselectore((state) => state.catalog);
  const [loading, setloading] = useState(true);
  const { basket, status } = useappselectore((state) => state.basket);
  const dispatch = useappdispatch();

  const [quantity, setquantity] = useState(0);

  const item = basket?.items.find((i) => i.productId === product?.id);
  useEffect(() => {
    if (item) setquantity(item.quantity);
    if (!product) dispatch(fetchproductasync(Number(id)));
  }, [id, item, dispatch, product]);
  if (productstate.includes("pending"))
    return <LoadingComponent message="loading product" />;
  if (!product) return <NotFound />;
  function handleinputchange(event: any) {
    if (event.target.value >= 0) {
      setquantity(parseInt(event.target.value));
    }
  }
  function handleupdatecart() {
    //increse cart item  or add new item to the cart
    if (!item || quantity > item?.quantity!) {
      const updatedquantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addbasketitemasync({
          productid: product?.id!,
          quantity: updatedquantity,
        })
      );
    }
    //reduce quantity  item case
    else {
      const updatedquantity = item.quantity - quantity;
      dispatch(
        removebasketitemasync({
          productid: product?.id!,
          quantity: updatedquantity,
        })
      );
    }
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {cerruncyformat(product.price)}
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>description</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>type</TableCell>
              <TableCell>{product.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>brand</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>quantity in stock</TableCell>
              <TableCell>{product.quentityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleinputchange}
              variant="outlined"
              type="number"
              label="quantity in card"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleupdatecart}
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              sx={{ height: "55px" }}
            >
              {item ? "update quantity" : "Add To Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
