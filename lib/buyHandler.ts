import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

declare global {
  interface Window {
    ethereumProvider?: ethers.providers.ExternalProvider & {
      isMetaMask?: boolean;
      request?: (method: string, params?: unknown[]) => Promise<unknown>;
    };
  }
}

type ToastFunction = (options: {
  title: string;
  variant?: 'default' | 'destructive' | null | undefined;
}) => void;

export const buyHandler = async (
  eventId: number,
  toast: ToastFunction
): Promise<void> => {
  if (eventId < 0) {
    toast({ title: 'Please enter a valid Event ID.', variant: 'destructive' });
    return;
  }

  try {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: 'Please install MetaMask or another Ethereum wallet',
        variant: 'destructive',
      });
      return;
    }

    // @ts-expect-error: window.ethereum might not match ExternalProvider exactly
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract().connect(signer);

    const ticketCost = await contract.getEventPriceFlare(eventId);
    const balance = await provider.getBalance(await signer.getAddress());

    if (balance.lt(ticketCost)) {
      toast({
        title: 'Insufficient balance to cover ticket cost and gas fees.',
        variant: 'destructive',
      });
      return;
    }

    const tx = await contract.buyTicket(eventId, { value: ticketCost });
    const receipt = await tx.wait();

    toast({
      title: `Ticket purchased successfully! Transaction Hash: ${receipt.transactionHash}`,
    });
  } catch (error) {
    console.error('Error buying ticket:', error);
    toast({
      title: 'Transaction failed. Please try again.',
      variant: 'destructive',
    });
  }
};
