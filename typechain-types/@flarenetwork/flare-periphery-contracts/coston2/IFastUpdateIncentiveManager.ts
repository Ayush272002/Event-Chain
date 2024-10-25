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

export declare namespace IFastUpdatesConfiguration {
  export type FeedConfigurationStruct = {
    feedId: PromiseOrValue<BytesLike>;
    rewardBandValue: PromiseOrValue<BigNumberish>;
    inflationShare: PromiseOrValue<BigNumberish>;
  };

  export type FeedConfigurationStructOutput = [string, number, number] & {
    feedId: string;
    rewardBandValue: number;
    inflationShare: number;
  };
}

export declare namespace IFastUpdateIncentiveManager {
  export type IncentiveOfferStruct = {
    rangeIncrease: PromiseOrValue<BigNumberish>;
    rangeLimit: PromiseOrValue<BigNumberish>;
  };

  export type IncentiveOfferStructOutput = [BigNumber, BigNumber] & {
    rangeIncrease: BigNumber;
    rangeLimit: BigNumber;
  };
}

export interface IFastUpdateIncentiveManagerInterface extends utils.Interface {
  functions: {
    "getBaseScale()": FunctionFragment;
    "getCurrentSampleSizeIncreasePrice()": FunctionFragment;
    "getExpectedSampleSize()": FunctionFragment;
    "getIncentiveDuration()": FunctionFragment;
    "getPrecision()": FunctionFragment;
    "getRange()": FunctionFragment;
    "getScale()": FunctionFragment;
    "offerIncentive((uint256,uint256))": FunctionFragment;
    "rangeIncreaseLimit()": FunctionFragment;
    "rangeIncreasePrice()": FunctionFragment;
    "sampleIncreaseLimit()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getBaseScale"
      | "getCurrentSampleSizeIncreasePrice"
      | "getExpectedSampleSize"
      | "getIncentiveDuration"
      | "getPrecision"
      | "getRange"
      | "getScale"
      | "offerIncentive"
      | "rangeIncreaseLimit"
      | "rangeIncreasePrice"
      | "sampleIncreaseLimit"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getBaseScale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentSampleSizeIncreasePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExpectedSampleSize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIncentiveDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPrecision",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getRange", values?: undefined): string;
  encodeFunctionData(functionFragment: "getScale", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "offerIncentive",
    values: [IFastUpdateIncentiveManager.IncentiveOfferStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "rangeIncreaseLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rangeIncreasePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sampleIncreaseLimit",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getBaseScale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentSampleSizeIncreasePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExpectedSampleSize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIncentiveDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPrecision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRange", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getScale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "offerIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rangeIncreaseLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rangeIncreasePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sampleIncreaseLimit",
    data: BytesLike
  ): Result;

  events: {
    "IncentiveOffered(uint24,uint256,uint256,uint256)": EventFragment;
    "InflationRewardsOffered(uint24,tuple[],uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "IncentiveOffered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InflationRewardsOffered"): EventFragment;
}

export interface IncentiveOfferedEventObject {
  rewardEpochId: number;
  rangeIncrease: BigNumber;
  sampleSizeIncrease: BigNumber;
  offerAmount: BigNumber;
}
export type IncentiveOfferedEvent = TypedEvent<
  [number, BigNumber, BigNumber, BigNumber],
  IncentiveOfferedEventObject
>;

export type IncentiveOfferedEventFilter =
  TypedEventFilter<IncentiveOfferedEvent>;

export interface InflationRewardsOfferedEventObject {
  rewardEpochId: number;
  feedConfigurations: IFastUpdatesConfiguration.FeedConfigurationStructOutput[];
  amount: BigNumber;
}
export type InflationRewardsOfferedEvent = TypedEvent<
  [
    number,
    IFastUpdatesConfiguration.FeedConfigurationStructOutput[],
    BigNumber
  ],
  InflationRewardsOfferedEventObject
>;

export type InflationRewardsOfferedEventFilter =
  TypedEventFilter<InflationRewardsOfferedEvent>;

export interface IFastUpdateIncentiveManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFastUpdateIncentiveManagerInterface;

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
    getBaseScale(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCurrentSampleSizeIncreasePrice(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getExpectedSampleSize(overrides?: CallOverrides): Promise<[BigNumber]>;

    getIncentiveDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPrecision(overrides?: CallOverrides): Promise<[BigNumber]>;

    getRange(overrides?: CallOverrides): Promise<[BigNumber]>;

    getScale(overrides?: CallOverrides): Promise<[BigNumber]>;

    offerIncentive(
      _offer: IFastUpdateIncentiveManager.IncentiveOfferStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rangeIncreaseLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    rangeIncreasePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    sampleIncreaseLimit(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  getBaseScale(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentSampleSizeIncreasePrice(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getExpectedSampleSize(overrides?: CallOverrides): Promise<BigNumber>;

  getIncentiveDuration(overrides?: CallOverrides): Promise<BigNumber>;

  getPrecision(overrides?: CallOverrides): Promise<BigNumber>;

  getRange(overrides?: CallOverrides): Promise<BigNumber>;

  getScale(overrides?: CallOverrides): Promise<BigNumber>;

  offerIncentive(
    _offer: IFastUpdateIncentiveManager.IncentiveOfferStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rangeIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;

  rangeIncreasePrice(overrides?: CallOverrides): Promise<BigNumber>;

  sampleIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getBaseScale(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentSampleSizeIncreasePrice(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExpectedSampleSize(overrides?: CallOverrides): Promise<BigNumber>;

    getIncentiveDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getPrecision(overrides?: CallOverrides): Promise<BigNumber>;

    getRange(overrides?: CallOverrides): Promise<BigNumber>;

    getScale(overrides?: CallOverrides): Promise<BigNumber>;

    offerIncentive(
      _offer: IFastUpdateIncentiveManager.IncentiveOfferStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    rangeIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;

    rangeIncreasePrice(overrides?: CallOverrides): Promise<BigNumber>;

    sampleIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "IncentiveOffered(uint24,uint256,uint256,uint256)"(
      rewardEpochId?: PromiseOrValue<BigNumberish> | null,
      rangeIncrease?: null,
      sampleSizeIncrease?: null,
      offerAmount?: null
    ): IncentiveOfferedEventFilter;
    IncentiveOffered(
      rewardEpochId?: PromiseOrValue<BigNumberish> | null,
      rangeIncrease?: null,
      sampleSizeIncrease?: null,
      offerAmount?: null
    ): IncentiveOfferedEventFilter;

    "InflationRewardsOffered(uint24,tuple[],uint256)"(
      rewardEpochId?: PromiseOrValue<BigNumberish> | null,
      feedConfigurations?: null,
      amount?: null
    ): InflationRewardsOfferedEventFilter;
    InflationRewardsOffered(
      rewardEpochId?: PromiseOrValue<BigNumberish> | null,
      feedConfigurations?: null,
      amount?: null
    ): InflationRewardsOfferedEventFilter;
  };

  estimateGas: {
    getBaseScale(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentSampleSizeIncreasePrice(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExpectedSampleSize(overrides?: CallOverrides): Promise<BigNumber>;

    getIncentiveDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getPrecision(overrides?: CallOverrides): Promise<BigNumber>;

    getRange(overrides?: CallOverrides): Promise<BigNumber>;

    getScale(overrides?: CallOverrides): Promise<BigNumber>;

    offerIncentive(
      _offer: IFastUpdateIncentiveManager.IncentiveOfferStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rangeIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;

    rangeIncreasePrice(overrides?: CallOverrides): Promise<BigNumber>;

    sampleIncreaseLimit(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getBaseScale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentSampleSizeIncreasePrice(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExpectedSampleSize(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIncentiveDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPrecision(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRange(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getScale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    offerIncentive(
      _offer: IFastUpdateIncentiveManager.IncentiveOfferStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rangeIncreaseLimit(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rangeIncreasePrice(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sampleIncreaseLimit(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
