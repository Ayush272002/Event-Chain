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
  numTickets: number,
  toast: ToastFunction
): Promise<void> => {
  if (eventId < 0) {
    toast({ title: 'Please enter a valid Event ID.', variant: 'destructive' });
    return;
  }

  if (numTickets <= 0) {
    toast({
      title: 'Please select at least one ticket.',
      variant: 'destructive',
    });
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract().connect(signer);

    const singleTicketCost = await contract.getEventPriceFlare(eventId);
    const totalTicketCost = singleTicketCost.mul(numTickets).mul(105).div(100);

    const balance = await provider.getBalance(await signer.getAddress());
    if (balance.lt(totalTicketCost)) {
      toast({
        title: 'Insufficient balance to cover ticket cost and gas fees.',
        variant: 'destructive',
      });
      return;
    }

    const tx = await contract.buyTicket(eventId, { value: totalTicketCost });
    const receipt = await tx.wait();

    toast({
      title: `Tickets purchased successfully! Transaction Hash: ${receipt.transactionHash}`,
    });
  } catch (error) {
    console.error('Error buying tickets:', error);
    toast({
      title: 'Transaction failed. Please try again.',
      variant: 'destructive',
    });
  }
};
