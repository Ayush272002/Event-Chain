/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Escrow, EscrowInterface } from "../../contracts/Escrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "approveEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
    ],
    name: "createEscrow",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "escrowCounter",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "buyerApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "sellerApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isComplete",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowAmount",
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
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowBuyer",
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
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowBuyerApproved",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowIsComplete",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowSeller",
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
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowSellerApproved",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b50610dca806100206000396000f3fe6080604052600436106100915760003560e01c8063451ee19111610059578063451ee191146101b85780638231f16e146101f5578063abebf91b14610232578063c7ceafea1461026f578063f6a8419e1461029a57610091565b8063012f52ee1461009657806303fce7ef146100d85780630a30a3c714610101578063275a56131461013e578063410b56971461017b575b600080fd5b3480156100a257600080fd5b506100bd60048036038101906100b891906109df565b6102b6565b6040516100cf96959493929190610a77565b60405180910390f35b3480156100e457600080fd5b506100ff60048036038101906100fa91906109df565b610359565b005b34801561010d57600080fd5b50610128600480360381019061012391906109df565b6106f1565b6040516101359190610ad8565b60405180910390f35b34801561014a57600080fd5b50610165600480360381019061016091906109df565b610730565b6040516101729190610af3565b60405180910390f35b34801561018757600080fd5b506101a2600480360381019061019d91906109df565b61075c565b6040516101af9190610ad8565b60405180910390f35b3480156101c457600080fd5b506101df60048036038101906101da91906109df565b61079b565b6040516101ec9190610b0e565b60405180910390f35b34801561020157600080fd5b5061021c600480360381019061021791906109df565b6107ba565b6040516102299190610af3565b60405180910390f35b34801561023e57600080fd5b50610259600480360381019061025491906109df565b6107e6565b6040516102669190610af3565b60405180910390f35b34801561027b57600080fd5b50610284610812565b6040516102919190610b0e565b60405180910390f35b6102b460048036038101906102af9190610b55565b610818565b005b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030160009054906101000a900460ff16908060030160019054906101000a900460ff16908060030160029054906101000a900460ff16905086565b600154811061039d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039490610bdf565b60405180910390fd5b60008082815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061046c575060008082815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6104ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a290610c4b565b60405180910390fd5b60008082815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361054657600160008083815260200190815260200160002060030160006101000a81548160ff021916908315150217905550610575565b600160008083815260200190815260200160002060030160016101000a81548160ff0219169083151502179055505b60008082815260200190815260200160002060030160009054906101000a900460ff1680156105c3575060008082815260200190815260200160002060030160019054906101000a900460ff165b156106ee57600160008083815260200190815260200160002060030160026101000a81548160ff021916908315150217905550600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000808481526020019081526020016000206002015460405161066690610c9c565b60006040518083038185875af1925050503d80600081146106a3576040519150601f19603f3d011682016040523d82523d6000602084013e6106a8565b606091505b50509050806106ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e390610cfd565b60405180910390fd5b505b50565b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600080600083815260200190815260200160002060030160019054906101000a900460ff169050919050565b600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000806000838152602001908152602001600020600201549050919050565b600080600083815260200190815260200160002060030160029054906101000a900460ff169050919050565b600080600083815260200190815260200160002060030160009054906101000a900460ff169050919050565b60015481565b6040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200134815260200160001515815260200160001515815260200160001515815250600080600154815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030160006101000a81548160ff02191690831515021790555060808201518160030160016101000a81548160ff02191690831515021790555060a08201518160030160026101000a81548160ff0219169083151502179055509050506001600081548092919061099c90610d4c565b919050555050565b600080fd5b6000819050919050565b6109bc816109a9565b81146109c757600080fd5b50565b6000813590506109d9816109b3565b92915050565b6000602082840312156109f5576109f46109a4565b5b6000610a03848285016109ca565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a3782610a0c565b9050919050565b610a4781610a2c565b82525050565b610a56816109a9565b82525050565b60008115159050919050565b610a7181610a5c565b82525050565b600060c082019050610a8c6000830189610a3e565b610a996020830188610a3e565b610aa66040830187610a4d565b610ab36060830186610a68565b610ac06080830185610a68565b610acd60a0830184610a68565b979650505050505050565b6000602082019050610aed6000830184610a3e565b92915050565b6000602082019050610b086000830184610a68565b92915050565b6000602082019050610b236000830184610a4d565b92915050565b610b3281610a2c565b8114610b3d57600080fd5b50565b600081359050610b4f81610b29565b92915050565b600060208284031215610b6b57610b6a6109a4565b5b6000610b7984828501610b40565b91505092915050565b600082825260208201905092915050565b7f496e76616c696420657363726f77204944000000000000000000000000000000600082015250565b6000610bc9601183610b82565b9150610bd482610b93565b602082019050919050565b60006020820190508181036000830152610bf881610bbc565b9050919050565b7f556e617574686f72697a65640000000000000000000000000000000000000000600082015250565b6000610c35600c83610b82565b9150610c4082610bff565b602082019050919050565b60006020820190508181036000830152610c6481610c28565b9050919050565b600081905092915050565b50565b6000610c86600083610c6b565b9150610c9182610c76565b600082019050919050565b6000610ca782610c79565b9150819050919050565b7f4661696c656420746f2073656e6420464c5220746f2073656c6c657200000000600082015250565b6000610ce7601c83610b82565b9150610cf282610cb1565b602082019050919050565b60006020820190508181036000830152610d1681610cda565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d57826109a9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d8957610d88610d1d565b5b60018201905091905056fea2646970667358221220d1eb6eb8535447ef73284c81282deb255049244024d75f71a8f763247b3b74f064736f6c63430008130033";

type EscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Escrow__factory extends ContractFactory {
  constructor(...args: EscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Escrow> {
    return super.deploy(overrides || {}) as Promise<Escrow>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Escrow {
    return super.attach(address) as Escrow;
  }
  override connect(signer: Signer): Escrow__factory {
    return super.connect(signer) as Escrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowInterface {
    return new utils.Interface(_abi) as EscrowInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Escrow {
    return new Contract(address, _abi, signerOrProvider) as Escrow;
  }
}
