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

function BasketPage() {
  const { basket, setBasket, removeitem } = useStorecontext();
  const [status, setstatus] = useState({ laoding: false, name: "" });
  function handleadditem(productid: number, name: string) {
    setstatus({ laoding: true, name });
    agent.Basket.AddItem(productid)
      .then((basket) => setBasket(basket))
      .catch((er) => console.log(er))
      .finally(() => setstatus({ laoding: false, name: "" }));
  }
  function handleremoveitem(productId: number, quantity = 1, name: string) {
    setstatus({ laoding: true, name });
    agent.Basket.RemoveItem(productId, quantity)
      .then(() => removeitem(productId, quantity))
      .catch((er) => console.log(er))
      .finally(() => setstatus({ laoding: false, name: "" }));
  }
  if (!basket)
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
                      status.laoding && status.name === "rem" + row.productId
                    }
                    onClick={() =>
                      handleremoveitem(row.productId, 1, "rem" + row.productId)
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>

                  {row.quantity}
                  <LoadingButton
                    loading={
                      status.laoding && status.name === "add" + row.productId
                    }
                    onClick={() =>
                      handleadditem(row.productId, "add" + row.productId)
                    }
                    color="primary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{cerruncyformat(row.price)}</TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.laoding && status.name === "del" + row.productId
                    }
                    onClick={() =>
                      handleremoveitem(
                        row.productId,
                        row.quantity,
                        "del" + row.productId
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
