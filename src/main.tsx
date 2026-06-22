import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./Routes";
import ThemeProviderWrapper from "./theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
      <Routes />
    </ThemeProviderWrapper>
  </React.StrictMode>,
);