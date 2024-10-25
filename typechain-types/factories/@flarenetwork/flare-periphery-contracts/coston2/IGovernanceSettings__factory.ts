/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGovernanceSettings,
  IGovernanceSettingsInterface,
} from "../../../../@flarenetwork/flare-periphery-contracts/coston2/IGovernanceSettings";

const _abi = [
  {
    inputs: [],
    name: "getExecutors",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGovernanceAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTimelock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "isExecutor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IGovernanceSettings__factory {
  static readonly abi = _abi;
  static createInterface(): IGovernanceSettingsInterface {
    return new utils.Interface(_abi) as IGovernanceSettingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGovernanceSettings {
    return new Contract(address, _abi, signerOrProvider) as IGovernanceSettings;
  }
}
