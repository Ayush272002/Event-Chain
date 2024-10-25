/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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

export interface IGovernanceSettingsInterface extends utils.Interface {
  functions: {
    "getExecutors()": FunctionFragment;
    "getGovernanceAddress()": FunctionFragment;
    "getTimelock()": FunctionFragment;
    "isExecutor(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getExecutors"
      | "getGovernanceAddress"
      | "getTimelock"
      | "isExecutor"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getExecutors",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGovernanceAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTimelock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isExecutor",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getExecutors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGovernanceAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimelock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isExecutor", data: BytesLike): Result;

  events: {};
}

export interface IGovernanceSettings extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IGovernanceSettingsInterface;

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
    getExecutors(overrides?: CallOverrides): Promise<[string[]]>;

    getGovernanceAddress(overrides?: CallOverrides): Promise<[string]>;

    getTimelock(overrides?: CallOverrides): Promise<[BigNumber]>;

    isExecutor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  getExecutors(overrides?: CallOverrides): Promise<string[]>;

  getGovernanceAddress(overrides?: CallOverrides): Promise<string>;

  getTimelock(overrides?: CallOverrides): Promise<BigNumber>;

  isExecutor(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    getExecutors(overrides?: CallOverrides): Promise<string[]>;

    getGovernanceAddress(overrides?: CallOverrides): Promise<string>;

    getTimelock(overrides?: CallOverrides): Promise<BigNumber>;

    isExecutor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    getExecutors(overrides?: CallOverrides): Promise<BigNumber>;

    getGovernanceAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getTimelock(overrides?: CallOverrides): Promise<BigNumber>;

    isExecutor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getExecutors(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGovernanceAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTimelock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isExecutor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
