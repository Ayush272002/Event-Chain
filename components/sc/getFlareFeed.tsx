'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers'; // Adjust the path to your ethers helper

const FlareFeed = () => {
  const [feedValue, setFeedValue] = useState<string | null>(null);
  const [decimals, setDecimals] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  const handleGetFeed = async () => {
    try {
      const contract = getContract();
      const feedData = await contract.getFlareFeed();

      // Assuming feedData[0] is BigNumber and needs conversion
      const _feedValue = ethers.utils.formatEther(feedData[0].toString());

      // feedData[1] and feedData[2] may be regular numbers (int8 and uint64), so no .toNumber() needed
      const _decimals = feedData[1]; // No need to convert if it's already an integer
      const _timestamp = new Date(feedData[2] * 1000).toLocaleString(); // Convert Unix timestamp to readable format

      setFeedValue(_feedValue);
      setDecimals(_decimals);
      setTimestamp(_timestamp);
    } catch (error) {
      console.error('Error fetching Flare feed data:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Flare Token Feed</h2>
      <button
        onClick={handleGetFeed}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Get Feed Data
      </button>

      {feedValue && (
        <div className="mt-4">
          <p>
            <strong>Feed Value (FLR/USD):</strong> {feedValue}
          </p>
          <p>
            <strong>Decimals:</strong> {decimals}
          </p>
          <p>
            <strong>Timestamp:</strong> {timestamp}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlareFeed;
