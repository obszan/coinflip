import { useWeb3Context } from "web3-react";
import ConnectButton from "./components/ConnectButton";
import GameComponent from "./components/GameComponent";
import "./App.scss";

function App() {
  const context = useWeb3Context();

  return (
    <div className="App">
      {context.active ? <GameComponent /> : <ConnectButton />}
    </div>
  );
}

export default App;
