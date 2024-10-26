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
      <Header />
      {eventDetails ? (
        <EventDescription eventDetails={eventDetails} />
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </>
  );
};

export default ListingPage;
