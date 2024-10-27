import { ethers } from 'ethers';
import { getContract } from './ethers';

declare global {
  interface Window {
    ethereumProvider?: ethers.providers.ExternalProvider & {
      isMetaMask?: boolean;
      request?: (method: string, params?: unknown[]) => Promise<unknown>;
    };
  }
}

export const transferTicket = async (
  ticketId: number,
  receiverAddress: string
): Promise<string> => {
  try {
    if (typeof window.ethereumProvider === 'undefined') {
      throw new Error('Please install MetaMask or another Ethereum wallet');
    }
    await window.ethereumProvider.request?.({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereumProvider);
    const signer = provider.getSigner();
    const contract = getContract().connect(signer);
    if (!ethers.utils.isAddress(receiverAddress)) {
      throw new Error('Invalid receiver address');
    }

    const tx = await contract.transferTicket(ticketId, receiverAddress);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  } catch (error) {
    console.error('Error transferring ticket:', error);
    throw error;
  }
};
