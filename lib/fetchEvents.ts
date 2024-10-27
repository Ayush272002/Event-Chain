import { ethers } from 'ethers';
import { getContract } from './ethers';

interface Event {
  eventId: number;
  name: string;
  description: string;
  location: string;
  capacity: number;
  ticketsSold: number;
  ticketPrice: number;
  eventStartDate: number;
  eventEndDate: number;
  images: string[];
  eventHost: string;
}

export const fetchEvents: () => Promise<Event[] | undefined> = async () => {
  try {
    console.log('Starting events call');
    if (typeof window.ethereum === 'undefined') {
      console.error('Ethereum provider not found');
      return;
    }

    console.log('Connecting to contract');
    const contract = getContract();
    const eventCount = await contract.eventCounter();
    const eventsData: Event[] = [];

    for (let i = 0; i < eventCount; i++) {
      const event = await contract.events(i);
      const images = await contract.getEventImages(i);
      eventsData.push({
        eventId: i,
        name: event.name,
        description: event.description,
        location: event.location,
        capacity: event.capacity.toNumber(),
        ticketsSold: event.ticketsSold.toNumber(),
        ticketPrice: event.ticketPrice.toNumber() / 100,
        eventStartDate: event.eventStartDate.toNumber(),
        eventEndDate: event.eventEndDate.toNumber(),
        images: images,
        eventHost: event.eventHost,
      });
    }

    return eventsData;
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
};
