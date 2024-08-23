import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../App/API/agent";
import { Order, OrederItem } from "../../App/Models/Order";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { cerruncyformat } from "../../App/util/util";
import OrederDetails from "./OrederDetails";
import { number } from "yup";

function Orders() {
  const [orders, setorder] = useState<Order[] | null>(null);
  const [loading, setloading] = useState(true);
  const [view, setview] = useState(false);
  const [id, seid] = useState<number>(0);
  console.log(orders);

  useEffect(() => {
    agent.order
      .list()
      .then((order) => {
        setorder(order);
      })
      .catch((er) => console.log(er))
      .finally(() => setloading(false));
  }, []);
  if (loading) return <LoadingComponent message="Loading order..." />;
  function handleview(id: number) {
    console.log(id);

    seid(id);
    setview(true);
  }
  function handlback() {
    setview(false);
  }

  if (view) {
    let orderitem = 0;
    console.log("fff");
    orders?.map((oredr, index) => {
      if (oredr.id === id) {
        orderitem = index;
      }
    });
    return (
      <OrederDetails
        orderitem={orders ? orders[orderitem].orederItems : undefined}
        //orderitem={orderitem}
        onclick={handlback}
      />
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right"> Order Status</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{cerruncyformat(row.total)}</TableCell>
                <TableCell align="right">
                  {row.orderDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">{row.orderStatus}</TableCell>

                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleview(row.id);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
