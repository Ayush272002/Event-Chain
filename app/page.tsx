'use client';
import { useEffect, useState } from 'react';
import Header from '../components/custom/header';
import Footer from '../components/custom/footer';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        <div className="relative z-20 min-h-screen bg-gradient-to-b from-transparent to-gray-900 pt-16">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-center">
              <Input
                type="text"
                placeholder="Search events ..."
                className="search-bar mt-4 p-2 border bg-white bg-opacity-25 border-gray-300 rounded-xl w-full max-w-5xl text-white"
              />
            </div>
            <main>
              <br></br>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Featured Events
                </h2>
                <p className="text-gray-300">
                  No events available at the moment.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Upcoming Events
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Event 1 - Date</li>
                  <li>Event 2 - Date</li>
                  <li>Event 3 - Date</li>
                </ul>
              </section>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
