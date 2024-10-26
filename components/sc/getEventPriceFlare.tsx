'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

const GetEventPrice = () => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [priceInFlr, setPriceInFlr] = useState<string | null>(null);

  const handleGetPrice = async () => {
    try {
      if (eventId === null) return;

      const contract = getContract();
      const flrPrice = await contract.getEventPriceFlare(eventId); // flr price in usd cents e.g. return 36856 meaning 500 usd cents
      setPriceInFlr(ethers.utils.formatEther(flrPrice.toString()));
    } catch (error) {
      console.error('Error fetching event price:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Get Event Price in FLR</h2>
      <input
        type="number"
        placeholder="Enter Event ID"
        value={eventId !== null ? eventId : ''}
        onChange={(e) => setEventId(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      <button
        onClick={handleGetPrice}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Price
      </button>
      {priceInFlr && <p>Event Price in FLR: {priceInFlr}</p>}
    </div>
  );
};

export default GetEventPrice;
