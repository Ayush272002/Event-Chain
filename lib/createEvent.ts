import { ethers } from 'ethers';
import { getContract } from './ethers';

interface CreateEventProps {
  name: string;
  description: string;
  location: string;
  capacity: number;
  ticketPrice: number;
  startDate: Date;
  endDate: Date;
  images: string[];
  toast: ToastFunction;
}

type ToastFunction = (options: {
  title: string;
  variant?: 'default' | 'destructive' | null | undefined;
}) => void;

declare global {
  interface Window {
    ethereumProvider?: ethers.providers.ExternalProvider & {
      isMetaMask?: boolean;
      request?: (method: string, params?: unknown[]) => Promise<unknown>;
    };
  }
}

export const createEvent = async ({
  name,
  description,
  location,
  capacity,
  ticketPrice,
  startDate,
  endDate,
  images,
  toast,
}: CreateEventProps) => {
  try {
    console.log('Starting createEvent function');
    if (typeof window.ethereum === 'undefined') {
      console.error('Ethereum provider not found');
      toast({
        title: 'Please install MetaMask or another Ethereum wallet',
        variant: 'destructive',
      });
      return;
    }

    console.log('Connecting to Ethereum provider');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract().connect(signer);

    console.log('Preparing transaction data');
    const tx = await contract.createEvent(
      name,
      description,
      capacity,
      ethers.utils.parseEther(ticketPrice.toString()),
      Math.floor(startDate.getTime() / 1000),
      images
    );

    console.log('Transaction sent, waiting for confirmation');
    const receipt = await tx.wait();

    console.log('Transaction confirmed:', receipt.transactionHash);
    toast({
      title: `Event created successfully! Transaction Hash: ${receipt.transactionHash}`,
    });

    return receipt.transactionHash;
  } catch (error) {
    console.error('Error in createEvent:', error);
    if (error instanceof Error) {
      toast({
        title: `Transaction failed: ${error.message}`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Transaction failed. Please try again.',
        variant: 'destructive',
      });
    }
    throw error;
  }
};
