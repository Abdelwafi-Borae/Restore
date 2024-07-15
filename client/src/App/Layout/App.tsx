import { Mode } from "@mui/icons-material";
import Catalog from "../../Features/Catalog/Catolog";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "../../Features/home/HomePage";

import Contact from "../../Features/contact/Contact";

import ProductDetails from "../../Features/Catalog/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "../../Features/about/About";
import NotFound from "../Errors/NotFound";
// import { Switch } from "react-router-dom";
import BasketPage from "../../Features/Basket/BasketPage";
import { useStorecontext } from "../context/Storecontext";
import { getCookie } from "../util/util";
import agent from "../API/agent";
import LoadingComponent from "./LoadingComponent";
import CheckOut from "../../Features/checkout/CheckOut";

import { useappdispatch, useappselectore } from "../store/configureStore";
import { setbasket } from "../../Features/Basket/Bsketslice";

function App() {
  const dispatch = useappdispatch();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const byerid = getCookie("buyerId");

    if (byerid) {
      agent.Basket.get()
        .then((basket) => dispatch(setbasket(basket)))
        .catch((err) => console.log(err))
        .finally(() => setloading(false));
    } else {
      setloading(false);
    }
  }, [dispatch]);
  console.log("reder srart the app");
  const [darkmode, setdarkmode] = useState(false);
  const platemode = darkmode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: platemode,
      background: { default: darkmode ? "#121212" : "#eaeaea" },
    },
  });
  // platemode === "light" ? "#eaeaea" : "121212"
  function handleswithch() {
    setdarkmode(!darkmode);
  }
  if (loading) return <LoadingComponent message="initialing App..." />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />

      <CssBaseline />
      <BrowserRouter>
        <Header handleswithch={handleswithch} darkmode={darkmode} />

        <Container>
          <Routes>
            {/* <Switch> */}
            {/* <Catalog /> */}
            <Route path="/" Component={HomePage} />
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
            <Route path="/catalog" Component={Catalog} />
            <Route path="/catalog/:id" Component={ProductDetails} />
            <Route path="*" Component={NotFound} />
            <Route path="/basket" Component={BasketPage} />
            <Route path="/checkout" Component={CheckOut} />
            {/* </Switch> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
