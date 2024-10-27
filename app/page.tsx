'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/custom/header';
import Footer from '../components/custom/footer';
import { Input } from '@/components/ui/input';
import FeaturedEvent from '@/components/custom/FeaturedEvent';
import { Button } from '@/components/ui/button';

import React from 'react';
import { FlipWords } from '@/components/ui/flip-words';

// profile
// profile props
// profile hanle

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const inputRef: any = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function searchForEvents() {
    if (inputRef.current.value == '') return;
    router.replace('/events?q=' + encodeURIComponent(inputRef.current.value));
  }

  const words = [
    'adventure',
    'concert',
    'outing',
    'journey',
    'hackathon',
    'conference',
  ];

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
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

        {/* Dark Overlay for Enhanced Readability */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Page Content Over the Video */}
        <div className="relative z-20 min-h-screen bg-gradient-to-b from-transparent to-gray-900 pt-20">
          <div className="container mx-auto p-4">
            <div className="container mx-auto justify-center items-center p-4">
              <div className="text-6xl font-bold text-white text-center text-shadow-lg">
                Book your next
                <FlipWords
                  words={words}
                  className="text-pink-500 text-opacity-75 pl-3.5"
                />
                on the Flare blockchain.
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 flex-col gap-4">
              <Input
                type="text"
                placeholder="Search for your next experience..."
                className="flex w-full rounded-md border border-input bg-white bg-opacity-50 placeholder:text-black px-4 py-6 text-lg shadow-sm"
                ref={inputRef}
              />
              <Button
                className="bg-pink-600 bg-opacity-50 text-white px-4 py-6 text-lg w-full hover:bg-pink-500"
                onClick={searchForEvents}
              >
                Search for events
              </Button>
            </div>
            <main>
              <section className="mb-8 mt-4 mx-auto grid grid-cols-4 gap-4">
                <FeaturedEvent
                  name="FAB XO Halloween"
                  description="Halloween is upon us and is one of the biggest nights of the FAB XO calendar.  Fancy dress is encouraged! So have your fancy dress ready and we look forward to seeing who have the best fancy dress on the night!  As a special treat we will be serving our very own witches brew!!!"
                  location="Birmingham, UK"
                  eventStartDate={1729980000}
                  eventHost="0x225C73C8c536C4F5335a2C1abECa95b0f221eeF6"
                  imageURL={
                    'https://www.guildofstudents.com/asset/Event/7572/Halloween-Fab-XO-Web-Event.jpg'
                  }
                />
                <FeaturedEvent
                  name="Halls Halloween Spooktacular"
                  description="Put on your spookiest costume and head on down to Pritchatts Park and join your Event Activators for our ResLife SPOOKTACULAR on Wednesday 30th October 5-8pm."
                  location="Birmingham, UK"
                  eventStartDate={1730307600}
                  eventHost="0x225C73C8c536C4F5335a2C1abECa95b0f221eeF6"
                  imageURL={
                    'https://www.guildofstudents.com/asset/Event/41187/Spooktacular-Web-Event-2024.png'
                  }
                />
                <FeaturedEvent
                  name="Housing Fair"
                  description="We’re hosting a Housing Fair, so make sure you save the date! Whether you’re living in student accommodation or the local community, this will be a great place to start as you begin thinking about where you’ll be living next year."
                  location="Birmingham, UK"
                  eventStartDate={1730804400}
                  eventHost="0x225C73C8c536C4F5335a2C1abECa95b0f221eeF6"
                  imageURL={
                    'https://www.guildofstudents.com/asset/Event/41111/Housing-Fair-Web-Event.png'
                  }
                />
              </section>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
