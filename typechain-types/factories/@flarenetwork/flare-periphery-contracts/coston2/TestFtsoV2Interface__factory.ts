/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  TestFtsoV2Interface,
  TestFtsoV2InterfaceInterface,
} from "../../../../@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes21",
        name: "_feedId",
        type: "bytes21",
      },
    ],
    name: "getFeedById",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "_decimals",
        type: "int8",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes21",
        name: "_feedId",
        type: "bytes21",
      },
    ],
    name: "getFeedByIdInWei",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getFeedByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "_decimals",
        type: "int8",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getFeedByIndexInWei",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getFeedId",
    outputs: [
      {
        internalType: "bytes21",
        name: "_feedId",
        type: "bytes21",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes21",
        name: "_feedId",
        type: "bytes21",
      },
    ],
    name: "getFeedIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes21[]",
        name: "_feedIds",
        type: "bytes21[]",
      },
    ],
    name: "getFeedsById",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "int8[]",
        name: "_decimals",
        type: "int8[]",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes21[]",
        name: "_feedIds",
        type: "bytes21[]",
      },
    ],
    name: "getFeedsByIdInWei",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_indices",
        type: "uint256[]",
      },
    ],
    name: "getFeedsByIndex",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "int8[]",
        name: "_decimals",
        type: "int8[]",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_indices",
        type: "uint256[]",
      },
    ],
    name: "getFeedsByIndexInWei",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "votingRoundId",
                type: "uint32",
              },
              {
                internalType: "bytes21",
                name: "id",
                type: "bytes21",
              },
              {
                internalType: "int32",
                name: "value",
                type: "int32",
              },
              {
                internalType: "uint16",
                name: "turnoutBIPS",
                type: "uint16",
              },
              {
                internalType: "int8",
                name: "decimals",
                type: "int8",
              },
            ],
            internalType: "struct TestFtsoV2Interface.FeedData",
            name: "body",
            type: "tuple",
          },
        ],
        internalType: "struct TestFtsoV2Interface.FeedDataWithProof",
        name: "_feedData",
        type: "tuple",
      },
    ],
    name: "verifyFeedData",
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

export class TestFtsoV2Interface__factory {
  static readonly abi = _abi;
  static createInterface(): TestFtsoV2InterfaceInterface {
    return new utils.Interface(_abi) as TestFtsoV2InterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestFtsoV2Interface {
    return new Contract(address, _abi, signerOrProvider) as TestFtsoV2Interface;
  }
}
