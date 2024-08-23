import Typography from "@mui/material/Typography";
import BasketTable from "../Basket/BasketTable";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import BasketSummery from "../Basket/BasketSummery";
import { useappselectore } from "../../App/store/configureStore";

export default function Review() {
  const { basket } = useappselectore((state) => state.basket);
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        Order Summery
      </Typography>
      <>
        <Grid container>
          {basket && <BasketTable items={basket.items} isbasket={false} />}
          <Grid container>
            <Grid item xs={4.9} />
            <Grid item xs={6}>
              <BasketSummery />
            </Grid>
          </Grid>
        </Grid>
      </>
    </>
  );
}
