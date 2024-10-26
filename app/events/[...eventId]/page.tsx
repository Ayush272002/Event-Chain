'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/custom/header';
import Footer from '../../../components/custom/footer';
import EventDescription from '../../../components/custom/EventDescription';

// Dummy function to simulate a GET request
const fetchEventDetails = (eventID: number) => {
  alert(`Fetching details for event ID: ${eventID}`);
  // Simulated JSON response for the event
  return {
    EventID: eventID,
    name: 'Example Event Name',
    date: '2023-12-01',
    location: 'Example Location',
    ticketPrice: 100,
    description: 'Detailed description of the event.',
    capacity: 300,
    ticketsSold: 150,
    imageUrl: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    host: 'Example Host',
    tickets: [1, 2, 3, 4],
  };
};

const ListingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventID = searchParams.get('eventID');

  // Simulate fetching data from backend
  if (eventID) {
    const eventDetails = fetchEventDetails(Number(eventID));
    console.log('Event Details:', eventDetails);
  }

  return (
    <>
      <Header />
      <EventDescription />
      <Footer />
    </>
  );
};

export default ListingPage;
