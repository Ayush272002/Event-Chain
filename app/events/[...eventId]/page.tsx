'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/custom/header';
import Footer from '../../../components/custom/footer';
import EventDescription from '../../../components/custom/EventDescription';

const ListingPage: React.FC = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<any>(null);

  useEffect(() => {
    const fetchEventDetails = async (id: number) => {
      alert(`Fetching details for event ID: ${id}`);
      // Dummy Response
      const details = {
        EventID: id,
        name: 'Example Event Name',
        date: '2023-12-01',
        location: 'Example Location',
        ticketPrice: 100,
        description: 'Detailed description of the event.',
        capacity: 300,
        ticketsSold: 295,
        imageUrl: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ],
        host: 'Example Host',
        tickets: [1, 2, 3, 4],
      };
      return details;
    };

    const getEventDetails = async () => {
      if (eventId) {
        const details = await fetchEventDetails(Number(eventId));
        setEventDetails(details);
      }
    };

    getEventDetails();
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
        {eventDetails ? (
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
