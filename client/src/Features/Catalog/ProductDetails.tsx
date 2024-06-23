import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { product } from "../../App/Models/product";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setproduct] = useState<product | null>(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://localhost:7031/Product/${id}`)
      .then((respose) => setproduct(respose.data))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [id]);
  if (loading) return <h3>looading</h3>;
  if (!product) return <h3>product not found</h3>;

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
          ${(product.price / 100).toFixed(2)}
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
              <TableCell>quantity</TableCell>
              <TableCell>{product.quentityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
