'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/custom/header';
import Footer from '../../../components/custom/footer';
import EventDescription from '../../../components/custom/EventDescription';
import { fetchEventDetails } from '@/lib/fetchEventDetails';

const ListingPage: React.FC = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [eventNotFound, setEventNotFound] = useState<boolean>(false);

  useEffect(() => {
    const getEventDetails = async () => {
      if (eventId) {
        const details = await fetchEventDetails({
          eventID: Number(eventId),
          toast: ({ title, variant }: any) => {
            alert(title);
          },
        });
        console.log(details);
        setEventDetails(details);
      }
    };

    getEventDetails().catch((err) => {
      setEventNotFound(true);
    });
  }, [eventId]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover z-0"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <source src="/BGVid3.mp4" type="video/mp4" />
          <source src="/BGVid3.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
      </div>

      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10">
        {eventNotFound ? (
          <p className="text-2xl text-white pt-20 text-center">
            Event not found
          </p>
        ) : eventDetails ? (
          <EventDescription eventDetails={eventDetails} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="relative z-20">
        <Footer />
      </div>
    </>
  );
};

export default ListingPage;
