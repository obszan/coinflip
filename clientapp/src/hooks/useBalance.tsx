import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";

export function useBalance() {
  const context = useWeb3Context();
  const provider = ethers.getDefaultProvider(context.networkId);
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    provider.getBalance(context.account as any).then((balance: any) => {
      setBalance(ethers.utils.formatEther(balance));
    });
  }, [context.networkId, context.account]);

  return balance;
}
