import { Button, Grid, Typography } from "@mui/material";
import BasketSummery from "./BasketSummery";
import { useappselectore } from "../../App/store/configureStore";
import BasketTable from "./BasketTable";
import { Link } from "react-router-dom";
import { Girl } from "@mui/icons-material";

function BasketPage() {
  const { basket } = useappselectore((state) => state.basket);

  console.log(basket);

  if (!basket || basket.items.length === 0)
    return (
      <>
        <Typography variant="h3">Shopping Cart </Typography>
        <br></br>
        <Typography variant="h4">your basket is Empty</Typography>
      </>
    );
  return (
    <>
      <Grid container>
        <BasketTable items={basket.items} />
        <Grid container>
          <Grid item xs={4.44} />
          <Grid item xs={6}>
            <BasketSummery />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              fullWidth
              size="large"
            >
              CkeckOut
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default BasketPage;
