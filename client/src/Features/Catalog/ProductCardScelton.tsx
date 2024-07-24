import { GifRounded, Margin } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

function ProductCardScelton() {
  return (
    <Grid item xs component={Card}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            style={{ marginBottom: 6 }}
            width={80}
            height={10}
          />
        }
      />
      <Skeleton animation="wave" variant="rectangular" height={190} />
      <CardContent>
        <>
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={10} />
          <Skeleton animation="wave" width={80} height={10} />
        </>
      </CardContent>
      <CardActions>
        <>
          {" "}
          <Skeleton animation="wave" width={40} height={10} />{" "}
          <Skeleton animation="wave" width={20} height={10} />
        </>
      </CardActions>
    </Grid>
  );
}

export default ProductCardScelton;
