import { ethers } from 'ethers';
import { getContract } from './ethers';

interface GetEventDetailsProps {
  eventID: number;
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

export const fetchEventDetails = async ({
  eventID,
  toast,
}: GetEventDetailsProps) => {
  try {
    console.log('Starting events call');
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
    const contract = getContract();

    console.log('Requesting data');
    const eventData = await contract.callStatic.events(eventID);
    const eventImages = await contract.callStatic.getEventImages(eventID);
    console.log(eventData);

    // toast({
    //   title: `Data fetched successfully!`,
    // });

    return {
      EventID: eventID,
      name: eventData.name,
      date: eventData.eventStartDate.toNumber(),
      location: eventData.location,
      ticketPrice: eventData.ticketPrice.toNumber() / 100,
      description: eventData.description,
      capacity: eventData.capacity.toNumber(),
      ticketsSold: eventData.ticketsSold.toNumber(),
      imageUrl: eventImages,
      host: eventData.eventHost
    }
  } catch (error) {
    console.error('Error in createEvent:', error);
    // if (error instanceof Error) {
    //   toast({
    //     title: `Transaction failed: ${error.message}`,
    //     variant: 'destructive',
    //   });
    // } else {
    //   toast({
    //     title: 'Transaction failed. Please try again.',
    //     variant: 'destructive',
    //   });
    // }
    throw error;
  }
};
