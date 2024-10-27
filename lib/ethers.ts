import { ethers } from 'ethers';
import EventManagerABI from '../contracts/EventManagerABI.json';

const FLARE_TESTNET_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function getFlareProvider() {
  const flareRpcUrl = FLARE_TESTNET_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(flareRpcUrl);
  return provider;
}

export function getContract() {
  const provider = getFlareProvider();
  const contractAddress = CONTRACT_ADDRESS;
  const contractABI = EventManagerABI;
  return new ethers.Contract(contractAddress!, contractABI, provider);
}
