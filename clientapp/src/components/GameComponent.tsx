import { useEffect, useState } from "react";
import { useBalance } from "../hooks/useBalance";
import Controls from "./Controls";
import Totals from "./Totals";
import "./Game.scss";
import { useContract } from "../hooks/useContract";

const GameComponent = () => {
  const [result, setResult] = useState<boolean>(false);
  const balance = useBalance();
  const contract = useContract();

  useEffect(() => {
    contract.on("winnerDrawn", (result: boolean) => setResult(result));
  }, []);

  return (
    <div className="game-wrapper">
      <div className="logo">Coin Flip Casino</div>
      <div className="balance">Balance: {balance}</div>
      <div className="game">
        <div className="result">{`${result || "Result"}`}</div>
        <div>
          <Totals />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
