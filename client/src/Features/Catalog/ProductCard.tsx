import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { product } from "../../App/Models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../App/API/agent";
import { LoadingButton } from "@mui/lab";
function ProductCard({ product }: props) {
  const [loading, setloading] = useState(false);
  function handleadditem(productid: number) {
    setloading(true);
    agent.Basket.AddItem(productid)
      .then((r) => console.log(r))
      .catch((er) => console.log(er))
      .finally(() => setloading(false));
  }
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "primary.main" }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: "contained" }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}/{product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() => handleadditem(product.id)}
            size="small"
          >
            Add to Card
          </LoadingButton>
          <Button size="small" href={`/catalog/${product.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
export default ProductCard;

interface props {
  product: product;
}
