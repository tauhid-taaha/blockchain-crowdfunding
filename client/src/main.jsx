import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";
import { StateContextProvider } from "./context";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { Sepolia } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    clientId="a6b0c2d5d0926719296c3d5bf2bf5ec5"
  >
    <BrowserRouter>
      <StateContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StateContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);
