'use client';

import React, { useState } from 'react';
import { getContract } from '@/lib/ethers'; // Adjust the path to your ethers helper

const GetEventImages = () => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [images, setImages] = useState<string[] | null>(null);

  const handleGetImages = async () => {
    try {
      const contract = getContract();

      if (eventId === null) return;

      const eventImages = await contract.getEventImages(eventId);
      setImages(eventImages);
    } catch (error) {
      console.error('Error fetching event images:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Get Event Images</h2>
      <input
        type="number"
        placeholder="Enter Event ID"
        value={eventId !== null ? eventId : ''}
        onChange={(e) => setEventId(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      <button
        onClick={handleGetImages}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Get Images
      </button>

      {images && (
        <div className="mt-4">
          <h3>Images for Event {eventId}:</h3>
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index}>
                <p>{img}</p>
                <img
                  src={img}
                  alt={`Event ${eventId} Image ${index + 1}`}
                  className="mb-4"
                />
              </div>
            ))
          ) : (
            <p>No images available for this event.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetEventImages;
