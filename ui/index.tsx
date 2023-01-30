import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { configure } from "axios-hooks";
import { env } from "./utils";
import { theme } from "./theme";
import App from "./App";
import axiosInstance from "./axios";

configure({ axios: axiosInstance });

ReactDOM.render(
  <>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </>,
  document.getElementById("app")
);
