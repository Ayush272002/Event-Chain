'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

const GetEventTickets = () => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [tickets, setTickets] = useState<number[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGetTickets = async () => {
    setErrorMessage(null);
    setTickets(null);

    if (eventId === null) {
      setErrorMessage('Please enter a valid Event ID.');
      return;
    }

    try {
      const contract = getContract();
      const eventTickets = await contract.getEventTickets(eventId);
      setTickets(
        eventTickets.map((ticket: ethers.BigNumber) => ticket.toNumber())
      );
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      setErrorMessage(
        'Failed to fetch tickets. Please check the Event ID and try again.'
      );
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

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
