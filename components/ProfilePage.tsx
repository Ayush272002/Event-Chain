import { useRouter } from 'next/router';
// import { Input } from 'postcss'; // Removed incorrect import
import React, { useEffect, useRef, useState } from 'react';
import FeaturedEvent from './custom/FeaturedEvent';
import Footer from './custom/footer';
import Header from './custom/header';
import { Button } from './ui/button';
import { FlipWords } from './ui/flip-words';

const ProfilePage = () => {
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
        <div className="relative z-20 min-h-screen bg-gradient-to-b from-transparent to-gray-900 pt-20"></div>
      </div>
    </>
  );
};

export default ProfilePage;
