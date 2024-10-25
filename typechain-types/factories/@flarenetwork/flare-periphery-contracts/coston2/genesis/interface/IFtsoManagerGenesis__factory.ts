/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFtsoManagerGenesis,
  IFtsoManagerGenesisInterface,
} from "../../../../../../@flarenetwork/flare-periphery-contracts/coston2/genesis/interface/IFtsoManagerGenesis";

const _abi = [
  {
    inputs: [],
    name: "getCurrentPriceEpochId",
    outputs: [
      {
        internalType: "uint256",
        name: "_priceEpochId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IFtsoManagerGenesis__factory {
  static readonly abi = _abi;
  static createInterface(): IFtsoManagerGenesisInterface {
    return new utils.Interface(_abi) as IFtsoManagerGenesisInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFtsoManagerGenesis {
    return new Contract(address, _abi, signerOrProvider) as IFtsoManagerGenesis;
  }
}
