import { Mode } from "@mui/icons-material";
import Catalog from "../../Features/Catalog/Catolog";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../Features/home/HomePage";
import about from "../../Features/about/About";
import Contact from "../../Features/contact/Contact";
import ProductCard from "../../Features/Catalog/ProductCard";
import ProductDetails from "../../Features/Catalog/ProductDetails";

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Header handleswithch={handleswithch} darkmode={darkmode} />

        <Container>
          <Routes>
            {/* <Catalog /> */}
            <Route path="/*" Component={HomePage} />
            <Route path="/about" Component={about} />
            <Route path="/contact" Component={Contact} />
            <Route path="/catalog" Component={Catalog} />
            <Route path="/catalog/:id" Component={ProductDetails} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
