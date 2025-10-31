import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./config/router.tsx";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./app/components/GlobalStyle.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routerConfig} />
    <Global styles={GlobalStyle} />
  </StrictMode>
);
