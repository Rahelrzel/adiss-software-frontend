import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./config/router.tsx";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./app/components/GlobalStyle.tsx";
import { store } from "./app/stores/utils/index.ts";
import { Provider } from "react-redux"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerConfig} />
      <Global styles={GlobalStyle} />
    </Provider>
  </StrictMode>
);
