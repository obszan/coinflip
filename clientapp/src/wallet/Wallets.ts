import { Connectors } from "web3-react";

const { InjectedConnector } = Connectors;

const networks = {
  Rinkeby: 4,
  Kovan: 42
};

const MetaMask = new InjectedConnector({
  supportedNetworks: [networks.Rinkeby],
});

export const connectors = { MetaMask };