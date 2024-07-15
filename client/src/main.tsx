import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/Layout/App.tsx";
import "./App/Layout/style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import { StoreProvider } from "./App/context/Storecontext.tsx";
import { store } from "./App/store/configureStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <StoreProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </StoreProvider> */}
  </React.StrictMode>
);
