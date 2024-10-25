'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';

// Define the Event interface including new fields
interface Event {
  EventID: number;
  name: string;
  date: string;
  location: string;
  ticketPrice: string;
  description: string;
  capacity: number;
  ticketsSold: number;
  imageUrl: string;
}

// Dummy function to fetch events
const fetchEvents = (): Event[] => {
  return [
    {
      EventID: 1,
      name: 'Rock Concert',
      date: '2023-12-01',
      location: 'New York City',
      ticketPrice: '$99',
      description: 'An exhilarating rock concert featuring famous bands.',
      capacity: 5000,
      ticketsSold: 4500,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      EventID: 2,
      name: 'Art Expo',
      date: '2023-11-15',
      location: 'San Francisco',
      ticketPrice: '$55',
      description: 'A showcase of modern art from around the world.',
      capacity: 300,
      ticketsSold: 260,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      EventID: 3,
      name: 'Tech Summit 2023',
      date: '2023-12-10',
      location: 'Chicago',
      ticketPrice: '$250',
      description: 'The leading tech summit with top industry speakers.',
      capacity: 2000,
      ticketsSold: 1800,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];
};

const TicketListing: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);

  useEffect(() => {
    const eventsData = fetchEvents();
    setEvents(eventsData);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="BGVid1.mp4"
      >
        Your browser does not support the video tag.
      </video>
      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto p-4 pt-16">
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
                  className="relative flex bg-white p-4 rounded-lg shadow-lg"
                  onMouseEnter={() => setHoveredEventId(event.EventID)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-1/4 rounded-lg"
                  />
                  <div className="ml-4 relative">
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <p className="text-gray-600">{event.date}</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-800 font-semibold">
                      {event.ticketPrice}
                    </p>
                    {event.ticketsSold / event.capacity >= 0.9 && (
                      <div className="mt-2 p-2 bg-yellow-300 text-black rounded">
                        Limited Tickets Remaining!
                      </div>
                    )}
                  </div>
                  <div className="absolute top-0 right-0 flex items-center space-x-2">
                    {hoveredEventId === event.EventID && (
                      <div className="top-0 left-4 w-full bg-white p-4 shadow-lg rounded-lg z-10">
                        <p>{event.description}</p>
                      </div>
                    )}
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
