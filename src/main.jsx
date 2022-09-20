import React from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import App from "./App";
import { productApi } from "./features/Products";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={productApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
