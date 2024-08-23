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

import { OrederItem } from "../../App/Models/Order";
interface Props {
  items?: OrederItem[];
  isorder?: boolean;
}
function OrderTable({ items, isorder = true }: Props) {
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
              {isorder && <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((row) => (
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
                        src={row.pictureURL}
                        alt={row.name}
                        style={{ height: 50, width: 50, marginRight: 20 }}
                      />
                      <span>{row.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {cerruncyformat(row.price)}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="right">
                    {cerruncyformat(row.price)}
                  </TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderTable;
