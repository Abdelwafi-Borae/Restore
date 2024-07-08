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
import { useStorecontext } from "../../App/context/Storecontext";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setproduct] = useState<product | null>(null);
  const [loading, setloading] = useState(true);
  const { basket, setBasket, removeitem } = useStorecontext();
  const [quantity, setquantity] = useState(0);
  const [submitting, setsubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);
  useEffect(() => {
    if (item) setquantity(item.quantity);
    agent.catalog
      .details(Number(id))
      .then((response) => setproduct(response))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [id, item]);
  if (loading) return <LoadingComponent message="loading product" />;
  if (!product) return <NotFound />;
  function handleinputchange(event: any) {
    if (event.target.value >= 0) {
      setquantity(parseInt(event.target.value));
    }
  }
  function handleupdatecart() {
    setsubmitting(true);
    //increse cart item  or add new item to the cart
    if (!item || quantity > item?.quantity!) {
      const updatedquantity = item ? quantity - item.quantity : quantity;
      agent.Basket.AddItem(product?.id!, updatedquantity)
        .then((basket) => {
          setBasket(basket);
          console.log("ssssss");
        })
        .catch((er) => console.log(er))
        .finally(() => setsubmitting(false));
    }
    //reduce quantity  item case
    else {
      const updatedquantity = item.quantity - quantity;
      agent.Basket.RemoveItem(product?.id!, updatedquantity)
        .then(() => removeitem(product?.id!, updatedquantity))
        .catch((er) => console.log(er))
        .finally(() => setsubmitting(false));
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
              loading={submitting}
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
