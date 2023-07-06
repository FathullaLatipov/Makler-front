import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.scss";
import App from "./App";
import { ContextProvider } from "./context/context";
import { BrowserRouter } from "react-router-dom";

import "./i18n";
import AppStore from "./store/AppStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <ContextProvider>
        <AppStore>
        < App />
        </AppStore>
      </ContextProvider>
    </BrowserRouter>
  </>
);
