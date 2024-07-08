import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useStorecontext } from "../../App/context/Storecontext";
import { cerruncyformat } from "../../App/util/util";
import { Link } from "react-router-dom";

function BasketSummery() {
  const { basket } = useStorecontext();

  let Subtotal =
    basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  let DeleveryFee = Subtotal! > 10000 ? 0 : 500;

  let TotalAmount = DeleveryFee + Subtotal!;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>

        <Grid item xs={6}>
          <TableContainer component={Paper} sx={{ width: 610 }}>
            <Divider sx={{ mb: 2 }} />

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>{cerruncyformat(Subtotal)} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delevery Fee</TableCell>
                  <TableCell>{cerruncyformat(DeleveryFee)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>{cerruncyformat(TotalAmount)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    *Order over $100 Qualify for free Delevery
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      component={Link}
                      to="/checkout"
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      CkeckOut
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default BasketSummery;
