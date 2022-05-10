import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useBalance } from "../hooks/useBalance";
import { useContract } from "../hooks/useContract";
import "./Controls.scss";

const Controls = () => {
  const contract = useContract();
  const [value, setValue] = useState<number>(0);
  const balance = useBalance();
  const [price, setPrice] = useState<number>(0);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  const handleTails = async (): Promise<void> => {
    contract.functions
      .betA(ethers.utils.parseEther(value.toString()))
      .then((res: any) => {
        console.log(res);
        console.log(contract);
      });
  };

  const handleHeads = (): void => {
    contract
      ?.betB(ethers.utils.parseEther(value.toString()))
      .then((res: any) => {
        console.log(res);
        console.log(contract);
      });
  };

  const valueChangeHandler = (event: any): void => {
    if (event.target.value < balance) {
      setValue(event.target.value);
    } else {
      setValue(balance);
    }
  };

  const drawWinnerHandler = (): void => {
    contract.drawWinner().then(() => {
      contract.claimPrice().then((res: any) => console.log(res));
    });
  };

  const claimPriceHandler = (): void => {
    contract.claimPrice();
  };

  useEffect(() => {
    contract.on("coinFlipOnGoing", () => setBtnDisabled(true));
  }, []);

  return (
    <div className="controls">
      <div className="amount">
        <input
          type="number"
          onChange={valueChangeHandler}
          min={0}
          value={value}
        />
      </div>
      <div className="bet-buttons">
        <button
          className={`btn ${!(value > 0) && "disabled"}`}
          onClick={handleTails}
          disabled={!(value > 0) || btnDisabled}
        >
          Tails
        </button>
        <button
          className={`btn ${!(value > 0) && "disabled"}`}
          onClick={handleHeads}
          disabled={!(value > 0) || btnDisabled}
        >
          Heads
        </button>
      </div>
      <div className="game-buttons">
        <button className="btn" onClick={drawWinnerHandler}>
          Draw winner
        </button>
        <button
          disabled={price === 0}
          className={`btn ${price === 0 && "disabled"}`}
          onClick={claimPriceHandler}
        >
          Claim price
        </button>
      </div>
    </div>
  );
};

export default Controls;
