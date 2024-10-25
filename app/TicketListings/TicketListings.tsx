'use client';
import React from 'react';
import Header from '../../components/custom/header'; // Adjust the import path as needed
import Footer from '../../components/custom/footer'; // Assuming you have a footer component
import { useEffect, useState } from 'react';

// Dummy function to fetch events
const fetchEvents = () => {
  return [
    {
      EventID: 1,
      name: 'Rock Concert',
      date: '2023-12-01',
      location: 'New York City',
      ticketPrice: '$99',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      EventID: 2,
      name: 'Art Expo',
      date: '2023-11-15',
      location: 'San Francisco',
      ticketPrice: '$55',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      EventID: 3,
      name: 'Tech Summit 2023',
      date: '2023-12-10',
      location: 'Chicago',
      ticketPrice: '$250',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];
};

interface Event {
  EventID: number;
  name: string;
  date: string;
  location: string;
  ticketPrice: string;
  imageUrl: string;
}

const TicketListing: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate fetching the events
    const eventsData = fetchEvents();
    setEvents(eventsData);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-16">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="search-bar mt-4 p-2 border border-gray-300 rounded w-full max-w-md"
          />
          <div className="flex mt-4 space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sort
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Filter
            </button>
          </div>
        </div>
        <main>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available Events
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {events.map((event) => (
                <div
                  key={event.EventID}
                  className="flex bg-white p-4 rounded-lg shadow-lg"
                >
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-1/4 rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <p className="text-gray-600">{event.date}</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-800 font-semibold">
                      {event.ticketPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TicketListing;
