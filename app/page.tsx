'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/custom/header';
import Footer from '../components/custom/footer';
import { Input } from '@/components/ui/input';
import FeaturedEvent from '@/components/custom/FeaturedEvent';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { fetchEvents } from '@/lib/fetchEvents';

// profile
// profile props
// profile hanle

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [events, setEvents] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    fetchEvents().then(eventsData => {
      eventsData = eventsData?.sort((a, b) => (a.ticketsSold - b.ticketsSold));
      setEvents(eventsData || []);
    })
  }, []);

  useEffect(() => {
    console.log("events updated");
    console.log(events);
  }, [events])

  function searchForEvents() {
    if (inputRef.current?.value === '') {
      alert('Please enter a search term.');
      return;
    }
    if (inputRef.current) {
      router.replace('/events?q=' + encodeURIComponent(inputRef.current.value));
    }
  }

  // Handler to check if the Enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchForEvents();
    }
  };

  const words = [
    'event',
    'adventure',
    'concert',
    'outing',
    'journey',
    'hackathon',
    'conference',
    'festival',
    'workshop',
    'seminar',
    'experience',
    'activity',
    'gathering',
  ];

  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden">
        {isClient && (
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="BGVid2.mp4"
          >
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 min-h-screen bg-gradient-to-b from-transparent to-gray-900 pt-20">
          <div className="container mx-auto p-4">
            <div className="container mx-auto justify-center items-center p-4">
              <div className="text-6xl font-bold text-white text-center text-shadow-lg">
                Book your next
                <FlipWords
                  words={words}
                  className="text-pink-500 text-opacity-75 pl-3.5"
                />
                <br />
                <p className="text-lg text-white text-opacity-75 mt-3">
                  Book securely with our leading Blockchain technology.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-6 flex-col gap-4">
              <Input
                type="text"
                placeholder="Search for your next experience..."
                className="flex w-full rounded-md border border-input bg-white bg-opacity-50 placeholder:text-black px-4 py-6 text-lg shadow-sm"
                ref={inputRef}
                onKeyDown={handleKeyDown} // Add key event handler here
              />
              <Button
                className="bg-pink-600 bg-opacity-50 text-white px-4 py-6 text-lg w-full hover:bg-pink-500"
                onClick={searchForEvents}
              >
                Search for events
              </Button>
            </div>
            <main>
              <section className="mb-8 mt-4 mx-auto grid grid-cols-4 col-span-4 gap-4 place-content-center">
                { events.map((ev: any, index: number) => {
                  return <>
                    <a onClick={() => { handleEventClick(ev.eventId) }}>
                      <FeaturedEvent
                        key={ev.eventId}
                        name={ev.name}
                        description={ev.description}
                        location={ev.location}
                        eventStartDate={ev.eventStartDate}
                        eventHost={ev.eventHost}
                        imageURL={ev.images[0] || ""}
                      />
                    </a>
                  </>
                }) }
              </section>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
