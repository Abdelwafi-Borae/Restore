import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Basket } from "../../App/Models/Basket";
import agent from "../../App/API/agent";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { Add, Delete, Remove, Widgets } from "@mui/icons-material";
import { useStorecontext } from "../../App/context/Storecontext";
import { LoadingButton } from "@mui/lab";
import BasketSummery from "./BasketSummery";
import { cerruncyformat } from "../../App/util/util";
import { Link } from "react-router-dom";
import {
  useappdispatch,
  useappselectore,
} from "../../App/store/configureStore";
import {
  addbasketitemasync,
  removebasketitemasync,
  setbasket,
} from "./Bsketslice";

function BasketPage() {
  const { basket, status } = useappselectore((state) => state.basket);
  const dispatch = useappdispatch();
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
      <TableContainer component={Paper} sx={{ width: 1000, height: 300 }}>
        <Table stickyHeader sx={{}}>
          <TableHead sx={{ width: 255, height: 2 }}>
            <TableRow>
              <TableCell>Item </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
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

                  {row.quantity}
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
                </TableCell>
                <TableCell align="right">{cerruncyformat(row.price)}</TableCell>

                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BasketSummery />
    </>
  );
}

export default BasketPage;
