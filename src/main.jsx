import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./Root";
import { NotFound } from "./NotFound";
import { Login } from "./Login";
import { Home } from "./Home";
import { Group, loaderGroup } from "./Group";
import { Profile } from "./Profile";

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
        { path: "/home/:group", element: <Group />, loader: loaderGroup },
        { path: "/profile", element: <Profile /> },
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
