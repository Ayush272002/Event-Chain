/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPChainVotePower,
  IPChainVotePowerInterface,
} from "../../../../@flarenetwork/flare-periphery-contracts/coston2/IPChainVotePower";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes20",
        name: "nodeId",
        type: "bytes20",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "VotePowerCacheCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes20",
        name: "nodeId",
        type: "bytes20",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priorVotePower",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVotePower",
        type: "uint256",
      },
    ],
    name: "VotePowerChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes20[]",
        name: "_nodeIds",
        type: "bytes20[]",
      },
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "batchVotePowerOfAt",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "stakesOf",
    outputs: [
      {
        internalType: "bytes20[]",
        name: "_nodeIds",
        type: "bytes20[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "stakesOfAt",
    outputs: [
      {
        internalType: "bytes20[]",
        name: "_nodeIds",
        type: "bytes20[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVotePower",
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
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "totalVotePowerAt",
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
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "totalVotePowerAtCached",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "bytes20",
        name: "_nodeId",
        type: "bytes20",
      },
    ],
    name: "votePowerFromTo",
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "bytes20",
        name: "_nodeId",
        type: "bytes20",
      },
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "votePowerFromToAt",
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
        internalType: "bytes20",
        name: "_nodeId",
        type: "bytes20",
      },
    ],
    name: "votePowerOf",
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
        internalType: "bytes20",
        name: "_nodeId",
        type: "bytes20",
      },
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "votePowerOfAt",
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
        internalType: "bytes20",
        name: "_owner",
        type: "bytes20",
      },
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "votePowerOfAtCached",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IPChainVotePower__factory {
  static readonly abi = _abi;
  static createInterface(): IPChainVotePowerInterface {
    return new utils.Interface(_abi) as IPChainVotePowerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPChainVotePower {
    return new Contract(address, _abi, signerOrProvider) as IPChainVotePower;
  }
}
