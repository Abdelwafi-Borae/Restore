import { Button, ButtonGroup, Typography } from "@mui/material";
import agent from "../../App/API/agent";

function about() {
  const d: ShippingAdress = {
    fullName: "abdo borai",
    address1: "kkhartoum",
    address2: "madani",
    city: "d",
    state: "d",
    zip: "d",
    country: "nnn",
  };
  const w: Welcome6 = { savAddress: true, shippingAdress: d };
  function create() {
    // const x = agent.order.createorder(w);
    // console.log(x);
  }
  function getid() {
    // const x = agent.order.getorder(4).then((x) => x);
    // console.log(x);
  }
  function get() {
    const x = agent.order.list();
    //const x = agent.Account.getuseraddress();
    console.log(x);
  }
  return (
    <>
      <Typography variant="h4"> About Page</Typography>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => create()}>Create Order</Button>
        <Button onClick={() => getid()}>Get Order By Id</Button>
        <Button onClick={() => get()}>Get All Order</Button>
      </ButtonGroup>
    </>
  );
}

export default about;
export interface Welcome6 {
  savAddress: boolean;
  shippingAdress: ShippingAdress;
}

export interface ShippingAdress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
