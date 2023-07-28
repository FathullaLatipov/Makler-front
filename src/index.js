import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.scss";
import App from "./App";
import { ContextProvider } from "./context/context";
import { BrowserRouter } from "react-router-dom";

import "./i18n";
import AppStore from "./store/AppStore";
import {CookiesProvider} from "react-cookie";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <CookiesProvider>
          <ContextProvider>
            <AppStore>
                <App />
            </AppStore>
          </ContextProvider>
        </CookiesProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
