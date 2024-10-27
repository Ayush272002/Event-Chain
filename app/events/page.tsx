'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';
import { p } from 'framer-motion/client';

export const dynamic = 'force-dynamic';

interface Event {
  EventID: number;
  name: string;
  date: string;
  location: string;
  ticketPrice: number;
  description: string;
  capacity: number;
  ticketsSold: number;
  imageUrl: string;
  host: string;
}

const fetchEvents = (): Event[] => {
  return [
    {
      EventID: 1,
      name: 'Rock Concert',
      date: '2023-12-01',
      location: 'New York City',
      ticketPrice: 99,
      description: 'An exhilarating rock concert featuring famous bands.',
      capacity: 5000,
      ticketsSold: 4500,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Music Mania',
    },
    {
      EventID: 2,
      name: 'Art Expo',
      date: '2023-11-15',
      location: 'San Francisco',
      ticketPrice: 55,
      description: 'A showcase of modern art from around the world.',
      capacity: 300,
      ticketsSold: 260,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Art Lovers',
    },
    {
      EventID: 3,
      name: 'Tech Summit 2023',
      date: '2023-12-10',
      location: 'Chicago',
      ticketPrice: 250,
      description: 'The leading tech summit with top industry speakers.',
      capacity: 2000,
      ticketsSold: 1800,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Tech Alliance',
    },
  ];
};

const EventsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const sortRef = React.useRef<HTMLDivElement>(null);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [selectedHost, setSelectedHost] = useState<string>('');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

  useEffect(() => {
    const eventsData = fetchEvents();
    setEvents(eventsData);
    setFilteredEvents(eventsData);

    if (initialQuery) {
      setFilteredEvents(
        eventsData.filter((event) =>
          ['name', 'date', 'location', 'description', 'host'].some((key) =>
            event[key as keyof Event]
              .toString()
              .toLowerCase()
              .includes(initialQuery.toLowerCase())
          )
        )
      );
    }
  }, [initialQuery]);

  useEffect(() => {
    let filtered = events.filter((event) =>
      ['name', 'date', 'location', 'description', 'host'].some((key) =>
        event[key as keyof Event]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );

    if (filterOptions.includes('limited')) {
      filtered = filtered.filter(
        (event) => event.ticketsSold / event.capacity >= 0.9
      );
    }

    if (filterOptions.includes('future')) {
      const now = new Date();
      filtered = filtered.filter((event) => new Date(event.date) > now);
    }

    if (filterOptions.includes('past')) {
      const now = new Date();
      filtered = filtered.filter((event) => new Date(event.date) < now);
    }

    if (selectedHost) {
      filtered = filtered.filter((event) => event.host === selectedHost);
    }

    if (sortOption === 'price-asc') {
      filtered = filtered.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (sortOption === 'price-desc') {
      filtered = filtered.sort((a, b) => b.ticketPrice - a.ticketPrice);
    } else if (sortOption === 'date-asc') {
      filtered = filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortOption === 'date-desc') {
      filtered = filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, sortOption, filterOptions, selectedHost, events]);

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setShowSortMenu(false);
    }
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilterMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEventClick = (eventID: number) => {
    router.push(`/events/${eventID}`);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="relative min-h-screen overflow-hidden">
        <Header />
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="BGVid1.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        <div className="relative z-20 container mx-auto p-4 pt-16">
          <Suspense fallback={<p>Loading...</p>}>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar mt-4 p-2 border border-gray-300 rounded w-full max-w-md"
            />
          </Suspense>
          <div className="flex mt-4 space-x-4">
            <div className="relative" ref={sortRef}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                Sort
              </button>
              {showSortMenu && (
                <div className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded border border-gray-300 z-30">
                  <button onClick={() => setSortOption('price-asc')}>
                    Price Ascending
                  </button>
                  <button onClick={() => setSortOption('price-desc')}>
                    Price Descending
                  </button>
                  <button onClick={() => setSortOption('date-asc')}>
                    Date Ascending
                  </button>
                  <button onClick={() => setSortOption('date-desc')}>
                    Date Descending
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={filterRef}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                Filters
              </button>
              {showFilterMenu && (
                <div className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded border border-gray-300 z-30">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.includes('limited')}
                      onChange={(e) =>
                        setFilterOptions(
                          e.target.checked
                            ? [...filterOptions, 'limited']
                            : filterOptions.filter((opt) => opt !== 'limited')
                        )
                      }
                    />
                    <span className="ml-2">Limited Tickets</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.includes('future')}
                      onChange={(e) =>
                        setFilterOptions(
                          e.target.checked
                            ? [...filterOptions, 'future']
                            : filterOptions.filter((opt) => opt !== 'future')
                        )
                      }
                    />
                    <span className="ml-2">Future Events</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.includes('past')}
                      onChange={(e) =>
                        setFilterOptions(
                          e.target.checked
                            ? [...filterOptions, 'past']
                            : filterOptions.filter((opt) => opt !== 'past')
                        )
                      }
                    />
                    <span className="ml-2">Past Events</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <main>
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Available Events
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {filteredEvents.map((event) => (
                  <button
                    key={event.EventID}
                    className="relative flex bg-white p-4 rounded-lg shadow-lg text-left"
                    onClick={() => handleEventClick(event.EventID)}
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
                        ${event.ticketPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-600">Host: {event.host}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default EventsPage;
