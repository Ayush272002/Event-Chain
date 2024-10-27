'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';
import { fetchEvents } from '@/lib/fetchEvents';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

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
    const getEvents = async () => {
      try {
        const eventsData: Event[] = (await fetchEvents())!;

        setEvents(eventsData);
        setFilteredEvents(eventsData);

        if (initialQuery) {
          setFilteredEvents(
            eventsData.filter((event) =>
              ['name', 'description', 'location', 'eventHost'].some((key) =>
                event[key as keyof Event]
                  .toString()
                  .toLowerCase()
                  .includes(initialQuery.toLowerCase())
              )
            )
          );
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    getEvents();
  }, [initialQuery]);

  useEffect(() => {
    let filtered = events.filter((event) =>
      ['name', 'description', 'location', 'eventHost'].some((key) =>
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
      const now = Math.floor(Date.now() / 1000);
      filtered = filtered.filter((event) => event.eventStartDate > now);
    }

    if (filterOptions.includes('past')) {
      const now = Math.floor(Date.now() / 1000);
      filtered = filtered.filter((event) => event.eventEndDate < now);
    }

    if (selectedHost) {
      filtered = filtered.filter((event) => event.eventHost === selectedHost);
    }

    if (sortOption === 'price-asc') {
      filtered = filtered.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (sortOption === 'price-desc') {
      filtered = filtered.sort((a, b) => b.ticketPrice - a.ticketPrice);
    } else if (sortOption === 'date-asc') {
      filtered = filtered.sort((a, b) => a.eventStartDate - b.eventStartDate);
    } else if (sortOption === 'date-desc') {
      filtered = filtered.sort((a, b) => b.eventStartDate - a.eventStartDate);
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

  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
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
        <br></br>

        <div className="relative z-20 container mx-auto p-4 pt-16">
          <Suspense
            fallback={
              <div className="mt-4 text-2xl text-white">Loading...</div>
            }
          >
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
              <Button
                className="bg-light-purple bg-opacity-75 rounded"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                Sort
              </Button>
              {showSortMenu && (
                <div className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded border border-gray-300 z-30">
                  <Button
                    variant="ghost"
                    onClick={() => setSortOption('price-asc')}
                  >
                    Price Ascending
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSortOption('price-desc')}
                  >
                    Price Descending
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSortOption('date-asc')}
                  >
                    Date Ascending
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSortOption('date-desc')}
                  >
                    Date Descending
                  </Button>
                </div>
              )}
            </div>

            <div className="relative" ref={filterRef}>
              <Button
                className="bg-light-purple bg-opacity-75 rounded"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                Filters
              </Button>
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

                  {/* Filter by Host */}
                  <select
                    value={selectedHost}
                    onChange={(e) => setSelectedHost(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded"
                  >
                    <option value="">All Hosts</option>
                    {Array.from(
                      new Set(events.map((event) => event.eventHost))
                    ).map((host) => (
                      <option key={host} value={host}>
                        {host}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <main>
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                <br />
                Available Events
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {filteredEvents.map((event) => (
                  <button
                    key={event.eventId}
                    className="relative flex bg-white p-4 rounded-lg shadow-lg text-left"
                    onClick={() => handleEventClick(event.eventId)}
                    onMouseEnter={() => setHoveredEventId(event.eventId)}
                    onMouseLeave={() => setHoveredEventId(null)}
                  >
                    <img
                      src={event.images[0] || '/placeholder.svg'}
                      alt={event.name}
                      className="w-1/4 rounded-lg"
                    />
                    <div className="ml-4 relative">
                      <h3 className="text-xl font-bold">{event.name}</h3>
                      <p className="text-gray-600">
                        {new Date(
                          event.eventStartDate * 1000
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">{event.location}</p>
                      <p className="text-gray-800 font-semibold">
                        ${event.ticketPrice}
                      </p>
                      <p className="text-gray-600">Host: {event.eventHost}</p>
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
