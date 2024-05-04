import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./Root";
import { NotFound } from "./NotFound";
import { Login } from "./Login";
import { Home } from "./Home";

// Importing the Bootstrap CSS (customized)
import "./scss/custom.scss";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,

      children: [
        {
          path: "/",
          element: <Login />,
        },
        { path: "/home", element: <Home /> },
      ],
    },
  ],
  { basename: "/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
