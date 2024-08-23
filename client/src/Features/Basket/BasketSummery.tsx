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
import { useappselectore } from "../../App/store/configureStore";

function BasketSummery() {
  const { basket } = useappselectore((state) => state.basket);

  let Subtotal =
    basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  let DeleveryFee = Subtotal! > 10000 ? 0 : 500;

  let TotalAmount = DeleveryFee + Subtotal!;

  return (
    <>
      {/* <Grid container spacing={2}>
        <TableContainer component={Paper} sx={{ width: 610 }}>
          <Divider sx={{ mb: 2 }} /> */}

      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{cerruncyformat(Subtotal)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Delevery Fee*</TableCell>
              <TableCell>{cerruncyformat(DeleveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Amount</TableCell>
              <TableCell>{cerruncyformat(TotalAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>*Order over $100 Qualify for free Delevery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BasketSummery;
