import { Contract, ethers } from "ethers";
import { abi } from "../contract/abi";

export function useContract(): Contract {
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    "0x9d750d187Dd2a4F90355dA3C0ac54c7F5D44Bb0D",
    abi,
    signer
  );

  return contract;
}
