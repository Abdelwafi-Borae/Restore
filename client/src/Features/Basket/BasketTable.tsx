import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { cerruncyformat } from "../../App/util/util";
import { removebasketitemasync, addbasketitemasync } from "./Bsketslice";
import {
  useappselectore,
  useappdispatch,
} from "../../App/store/configureStore";
import { Basket, BasketItem } from "../../App/Models/Basket";
interface Props {
  items: BasketItem[];
  isbasket?: boolean;
}
function BasketTable({ items, isbasket = true }: Props) {
  const { status } = useappselectore((state) => state.basket);
  const dispatch = useappdispatch();
  return (
    <>
      <TableContainer component={Paper} sx={{ width: 1000 }}>
        <Table stickyHeader sx={{}}>
          <TableHead sx={{ width: 255, height: 2 }}>
            <TableRow>
              <TableCell>Item </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              {isbasket && <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.productId}
                sx={{
                  width: 20,
                  height: 2,
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, width: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{cerruncyformat(row.price)}</TableCell>
                <TableCell align="center">
                  {isbasket && (
                    <LoadingButton
                      loading={
                        status === "pendingremoveitem" + row.productId + "del"
                      }
                      onClick={() =>
                        dispatch(
                          removebasketitemasync({
                            productid: row.productId,
                            quantity: 1,
                            name: "del",
                          })
                        )
                      }
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                  )}

                  {row.quantity}
                  {isbasket && (
                    <LoadingButton
                      loading={status === "pendingadditem" + row.productId}
                      onClick={() =>
                        dispatch(
                          addbasketitemasync({
                            productid: row.productId,
                          })
                        )
                      }
                      color="primary"
                    >
                      <Add />
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell align="right">{cerruncyformat(row.price)}</TableCell>

                <TableCell align="right">
                  {isbasket && (
                    <LoadingButton
                      loading={status === "pendingremoveitem" + row.productId}
                      onClick={() =>
                        dispatch(
                          removebasketitemasync({
                            productid: row.productId,
                            quantity: row.quantity,
                          })
                        )
                      }
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BasketTable;
