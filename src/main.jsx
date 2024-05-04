import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Header } from "./Header";

// Importing the Bootstrap CSS (customized)
import "./scss/custom.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Home />
  </React.StrictMode>
);
