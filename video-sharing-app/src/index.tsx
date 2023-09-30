import ReactDOM from "react-dom/client";
import App from "./app";
import { ThemeConfig } from "./shared/theme";
import { GlobalStyles } from "./shared/theme/global-styles";
import React from "react";
import { RootStoreProvider, rootStore } from "stores/root-store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeConfig>
    <GlobalStyles />
    <RootStoreProvider value={rootStore}>
      <App />
    </RootStoreProvider>
  </ThemeConfig>
);
