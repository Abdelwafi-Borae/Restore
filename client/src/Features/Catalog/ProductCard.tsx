import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { product } from "../../App/Models/product";
function ProductCard({ product }: props) {
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
          <Button size="small">Add to Card</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </>
  );
}
export default ProductCard;

interface props {
  product: product;
}
// /images/products/boot-core1.png
