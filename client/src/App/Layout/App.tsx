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
      <CssBaseline />
      <Header handleswithch={handleswithch} darkmode={darkmode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
