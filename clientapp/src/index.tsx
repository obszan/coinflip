import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Web3Provider from "web3-react";
import { connectors } from "./wallet/Wallets";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3Provider connectors={connectors} libraryName={"ethers.js"}>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
