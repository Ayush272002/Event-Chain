'use client';

import React, { useState } from 'react';
import { getContract } from '@/lib/ethers'; // Adjust the path to your ethers helper

const GetEventTickets = () => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [tickets, setTickets] = useState<number[] | null>(null);

  const handleGetTickets = async () => {
    try {
      const contract = getContract();

      if (eventId === null) return;

      const eventTickets = await contract.getEventTickets(eventId);
      setTickets(eventTickets);
    } catch (error) {
      console.error('Error fetching event tickets:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Get Event Tickets</h2>
      <input
        type="number"
        placeholder="Enter Event ID"
        value={eventId !== null ? eventId : ''}
        onChange={(e) => setEventId(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      <button
        onClick={handleGetTickets}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Get Tickets
      </button>

      {tickets && (
        <div className="mt-4">
          <h3>Tickets for Event {eventId}:</h3>
          {tickets.length > 0 ? (
            <ul>
              {tickets.map((ticketId, index) => (
                <li key={index}>Ticket ID: {ticketId}</li>
              ))}
            </ul>
          ) : (
            <p>No tickets available for this event.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetEventTickets;
