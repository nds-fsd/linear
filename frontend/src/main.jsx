import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ContextProvider } from "./Context";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <ContextProvider>
              <App />
              <ReactQueryDevtools />
          </ContextProvider>
      </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
