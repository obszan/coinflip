import { useWeb3Context } from "web3-react";
import "./ConnectButton.scss";

const ConnectButton = () => {
  const context = useWeb3Context();

  const connectHandler = () => {
    context
      .setFirstValidConnector(["MetaMask"])
      .catch((e) => console.error("Error initializing MetaMask"));
  };

  return (
    <button className="btn" onClick={connectHandler}>
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
