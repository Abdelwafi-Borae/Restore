import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import BasketSummery from "../Basket/BasketSummery";
import { OrederItem } from "../../App/Models/Order";
import OrderTable from "./OrderTable";
interface Props {
  orderitem?: OrederItem[];
  onclick(): void;
}
function OrederDetails({ orderitem, onclick }: Props) {
  return (
    <>
      <Grid container>
        <OrderTable items={orderitem} />
        <Grid container>
          <Grid item xs={4.44} />
          <Grid item xs={6}>
            <BasketSummery />
            <Button
              component={Link}
              to="/orders"
              onClick={() => {
                onclick();
              }}
              variant="contained"
              fullWidth
              size="large"
            >
              back to orders
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default OrederDetails;
