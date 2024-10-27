'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';
import Profile from '@/components/custom/Profile';
import PreviousTickets from '@/components/PreviousTickets';

const ProfilePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    // This ensures the component renders only on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {});

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <Header />
        <div className="relative z-20 container mx-auto p-4 pt-16">
          <div className="relative min-h-screen overflow-hidden">
            {/* Video Background */}
            {isClient && (
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/BGVid2.mp4" // Ensure the video file is placed in the public folder
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Dark Overlay for Enhanced Readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            <div className="relative flex flex-col space-y-10 mt-20 z-20 ml-10">
              <Profile profileKey="38902kj2-8hf082gb0f20g02h082" />

              {/* Render PreviousTickets component with appropriate props */}
              <PreviousTickets
                name="Sample Event"
                status={true}
                description="Description of the event"
                capacity={100}
                ticketPrice={50}
                eventStartDate={new Date('2024-11-01T10:00:00')}
                eventHost="Host Name"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
