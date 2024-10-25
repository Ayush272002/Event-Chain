/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface IValidatorRegistryInterface extends utils.Interface {
  functions: {
    "getDataProviderForNodeId(bytes32)": FunctionFragment;
    "getDataProviderForPChainPublicKey(bytes32)": FunctionFragment;
    "getDataProviderInfo(address)": FunctionFragment;
    "registerDataProvider(string,string)": FunctionFragment;
    "unregisterDataProvider()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getDataProviderForNodeId"
      | "getDataProviderForPChainPublicKey"
      | "getDataProviderInfo"
      | "registerDataProvider"
      | "unregisterDataProvider"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getDataProviderForNodeId",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataProviderForPChainPublicKey",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataProviderInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerDataProvider",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unregisterDataProvider",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getDataProviderForNodeId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataProviderForPChainPublicKey",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataProviderInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerDataProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unregisterDataProvider",
    data: BytesLike
  ): Result;

  events: {
    "DataProviderRegistered(address,string,string)": EventFragment;
    "DataProviderUnregistered(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DataProviderRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DataProviderUnregistered"): EventFragment;
}

export interface DataProviderRegisteredEventObject {
  dataProvider: string;
  nodeId: string;
  pChainPublicKey: string;
}
export type DataProviderRegisteredEvent = TypedEvent<
  [string, string, string],
  DataProviderRegisteredEventObject
>;

export type DataProviderRegisteredEventFilter =
  TypedEventFilter<DataProviderRegisteredEvent>;

export interface DataProviderUnregisteredEventObject {
  dataProvider: string;
}
export type DataProviderUnregisteredEvent = TypedEvent<
  [string],
  DataProviderUnregisteredEventObject
>;

export type DataProviderUnregisteredEventFilter =
  TypedEventFilter<DataProviderUnregisteredEvent>;

export interface IValidatorRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IValidatorRegistryInterface;

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
    getDataProviderForNodeId(
      _nodeId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _dataProvider: string }>;

    getDataProviderForPChainPublicKey(
      _pChainPublicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _dataProvider: string }>;

    getDataProviderInfo(
      _dataProvider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { _nodeId: string; _pChainPublicKey: string }
    >;

    registerDataProvider(
      _nodeId: PromiseOrValue<string>,
      _pChainPublicKey: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unregisterDataProvider(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getDataProviderForNodeId(
    _nodeId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getDataProviderForPChainPublicKey(
    _pChainPublicKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getDataProviderInfo(
    _dataProvider: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, string] & { _nodeId: string; _pChainPublicKey: string }>;

  registerDataProvider(
    _nodeId: PromiseOrValue<string>,
    _pChainPublicKey: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unregisterDataProvider(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getDataProviderForNodeId(
      _nodeId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getDataProviderForPChainPublicKey(
      _pChainPublicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getDataProviderInfo(
      _dataProvider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { _nodeId: string; _pChainPublicKey: string }
    >;

    registerDataProvider(
      _nodeId: PromiseOrValue<string>,
      _pChainPublicKey: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unregisterDataProvider(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "DataProviderRegistered(address,string,string)"(
      dataProvider?: PromiseOrValue<string> | null,
      nodeId?: null,
      pChainPublicKey?: null
    ): DataProviderRegisteredEventFilter;
    DataProviderRegistered(
      dataProvider?: PromiseOrValue<string> | null,
      nodeId?: null,
      pChainPublicKey?: null
    ): DataProviderRegisteredEventFilter;

    "DataProviderUnregistered(address)"(
      dataProvider?: PromiseOrValue<string> | null
    ): DataProviderUnregisteredEventFilter;
    DataProviderUnregistered(
      dataProvider?: PromiseOrValue<string> | null
    ): DataProviderUnregisteredEventFilter;
  };

  estimateGas: {
    getDataProviderForNodeId(
      _nodeId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDataProviderForPChainPublicKey(
      _pChainPublicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDataProviderInfo(
      _dataProvider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerDataProvider(
      _nodeId: PromiseOrValue<string>,
      _pChainPublicKey: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unregisterDataProvider(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getDataProviderForNodeId(
      _nodeId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDataProviderForPChainPublicKey(
      _pChainPublicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDataProviderInfo(
      _dataProvider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerDataProvider(
      _nodeId: PromiseOrValue<string>,
      _pChainPublicKey: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unregisterDataProvider(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
