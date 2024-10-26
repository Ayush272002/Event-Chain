'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/ethers';

const EventCounter = () => {
  const [eventCount, setEventCount] = useState<number>(0);

  useEffect(() => {
    console.log('EventCounter component mounted');

    const fetchEventCounter = async () => {
      const contract = getContract();
      try {
        const count = await contract.eventCounter(); // Fetch event counter value
        setEventCount(Number(count)); // Convert to regular number if it's not a BigNumber
        console.log('Event count:', Number(count)); // Log the count to ensure it's correct
      } catch (error) {
        console.error('Error fetching event counter:', error);
      }
    };

    fetchEventCounter();
  }, []);

  return (
    <div>
      <h1>Event Counter: {eventCount}</h1>
    </div>
  );
};

export default EventCounter;
