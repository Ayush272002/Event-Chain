'use client';

import EventForm from '@/components/custom/EventForm';
import FeaturedEvent from '@/components/custom/FeaturedEvent';
import Footer from '@/components/custom/footer';
import Header from '@/components/custom/header';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EventFormData } from '@/components/custom/EventForm';

const Page = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function searchForEvents() {
    if (inputRef.current && inputRef.current.value === '') return;

    if (inputRef.current)
      router.replace('/events?q=' + encodeURIComponent(inputRef.current.value));
  }

  function handleSubmit(data: {
    name: string;
    description: string;
    capacity: number;
    ticketPrice: number;
    location: string;
    eventStartTime: Date;
    eventEndTime?: Date | undefined;
    images?: string[] | undefined;
  }) {
    // Logic for handling the form submission
    console.log('Event data submitted:', data);
    // You can replace the console log with an API call or any other handling logic
    router.push('/events');
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
          <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
            <motion.div
              className="w-full max-w-3xl p-8 bg-black bg-opacity-40 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-6xl font-bold text-white text-center text-shadow-lg flex justify-center items-center flex-col">
                <motion.h1
                  className="mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Create your event here!
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <EventForm onSubmit={handleSubmit} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
