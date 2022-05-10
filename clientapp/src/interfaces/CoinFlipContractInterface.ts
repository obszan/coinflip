import { BigNumber } from "ethers";

export interface CoinFlipContractInterface {
    winnerA: boolean;
    winnerB: boolean;
    totalPriceA: number;
    totalPriceB: number;
    winnerDrawn: () => void;
    coinFlipOngoing: () => void;
    betA: (amountToBet: BigNumber) => void;
    betB: (amountToBet: BigNumber) => void;
    drawWinner: () => void;
    claimPrice: () => void
}