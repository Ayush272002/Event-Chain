/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export declare namespace FtsoV2Interface {
  export type FeedDataStruct = {
    votingRoundId: PromiseOrValue<BigNumberish>;
    id: PromiseOrValue<BytesLike>;
    value: PromiseOrValue<BigNumberish>;
    turnoutBIPS: PromiseOrValue<BigNumberish>;
    decimals: PromiseOrValue<BigNumberish>;
  };

  export type FeedDataStructOutput = [
    number,
    string,
    number,
    number,
    number
  ] & {
    votingRoundId: number;
    id: string;
    value: number;
    turnoutBIPS: number;
    decimals: number;
  };

  export type FeedDataWithProofStruct = {
    proof: PromiseOrValue<BytesLike>[];
    body: FtsoV2Interface.FeedDataStruct;
  };

  export type FeedDataWithProofStructOutput = [
    string[],
    FtsoV2Interface.FeedDataStructOutput
  ] & { proof: string[]; body: FtsoV2Interface.FeedDataStructOutput };
}

export interface FtsoV2InterfaceInterface extends utils.Interface {
  functions: {
    "getFeedById(bytes21)": FunctionFragment;
    "getFeedByIdInWei(bytes21)": FunctionFragment;
    "getFeedByIndex(uint256)": FunctionFragment;
    "getFeedByIndexInWei(uint256)": FunctionFragment;
    "getFeedId(uint256)": FunctionFragment;
    "getFeedIndex(bytes21)": FunctionFragment;
    "getFeedsById(bytes21[])": FunctionFragment;
    "getFeedsByIdInWei(bytes21[])": FunctionFragment;
    "getFeedsByIndex(uint256[])": FunctionFragment;
    "getFeedsByIndexInWei(uint256[])": FunctionFragment;
    "verifyFeedData((bytes32[],(uint32,bytes21,int32,uint16,int8)))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getFeedById"
      | "getFeedByIdInWei"
      | "getFeedByIndex"
      | "getFeedByIndexInWei"
      | "getFeedId"
      | "getFeedIndex"
      | "getFeedsById"
      | "getFeedsByIdInWei"
      | "getFeedsByIndex"
      | "getFeedsByIndexInWei"
      | "verifyFeedData"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getFeedById",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedByIdInWei",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedByIndex",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedByIndexInWei",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedIndex",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedsById",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedsByIdInWei",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedsByIndex",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeedsByIndexInWei",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyFeedData",
    values: [FtsoV2Interface.FeedDataWithProofStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "getFeedById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedByIdInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedByIndexInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFeedId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFeedIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedsById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedsByIdInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedsByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeedsByIndexInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyFeedData",
    data: BytesLike
  ): Result;

  events: {};
}

export interface FtsoV2Interface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FtsoV2InterfaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getFeedById(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedByIdInWei(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedByIndex(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedByIndexInWei(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedId(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { _feedId: string }>;

    getFeedIndex(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _index: BigNumber }>;

    getFeedsById(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedsByIdInWei(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedsByIndex(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getFeedsByIndexInWei(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifyFeedData(
      _feedData: FtsoV2Interface.FeedDataWithProofStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  getFeedById(
    _feedId: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedByIdInWei(
    _feedId: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedByIndex(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedByIndexInWei(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedId(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getFeedIndex(
    _feedId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFeedsById(
    _feedIds: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedsByIdInWei(
    _feedIds: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedsByIndex(
    _indices: PromiseOrValue<BigNumberish>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getFeedsByIndexInWei(
    _indices: PromiseOrValue<BigNumberish>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifyFeedData(
    _feedData: FtsoV2Interface.FeedDataWithProofStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    getFeedById(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber] & {
        _value: BigNumber;
        _decimals: number;
        _timestamp: BigNumber;
      }
    >;

    getFeedByIdInWei(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { _value: BigNumber; _timestamp: BigNumber }
    >;

    getFeedByIndex(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber] & {
        _value: BigNumber;
        _decimals: number;
        _timestamp: BigNumber;
      }
    >;

    getFeedByIndexInWei(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { _value: BigNumber; _timestamp: BigNumber }
    >;

    getFeedId(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getFeedIndex(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeedsById(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], number[], BigNumber] & {
        _values: BigNumber[];
        _decimals: number[];
        _timestamp: BigNumber;
      }
    >;

    getFeedsByIdInWei(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber] & { _values: BigNumber[]; _timestamp: BigNumber }
    >;

    getFeedsByIndex(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], number[], BigNumber] & {
        _values: BigNumber[];
        _decimals: number[];
        _timestamp: BigNumber;
      }
    >;

    getFeedsByIndexInWei(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber] & { _values: BigNumber[]; _timestamp: BigNumber }
    >;

    verifyFeedData(
      _feedData: FtsoV2Interface.FeedDataWithProofStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    getFeedById(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedByIdInWei(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedByIndex(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedByIndexInWei(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedId(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeedIndex(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeedsById(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedsByIdInWei(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedsByIndex(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getFeedsByIndexInWei(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifyFeedData(
      _feedData: FtsoV2Interface.FeedDataWithProofStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getFeedById(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedByIdInWei(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedByIndex(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedByIndexInWei(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedId(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeedIndex(
      _feedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeedsById(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedsByIdInWei(
      _feedIds: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedsByIndex(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getFeedsByIndexInWei(
      _indices: PromiseOrValue<BigNumberish>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifyFeedData(
      _feedData: FtsoV2Interface.FeedDataWithProofStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
