'use client';
import React from 'react';
import EventDescription from '@/components/custom/EventDescription';
import Home from '../components/Home';
import EventForm from '@/components/custom/EventForm';

export default function Page() {
  // Define the handleSubmit function
  const handleSubmit = (data: {
    name: string;
    description: string;
    capacity: number;
    ticketPrice: number;
    eventDate: Date;
    eventStartTime?: string;
    eventEndTime?: string;
    images?: string[];
  }) => {
    try {
      // Log the data to the console (you can replace this with an API call or other logic)
      console.log('Form Submitted:', data);

      // You can format the eventDate if needed (e.g., to a specific date format)
      const formattedDate = new Date(data.eventDate).toISOString();
      console.log('Formatted Event Date:', formattedDate);

      // Example: Post data to an API endpoint
      // fetch('/api/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ...data, eventDate: formattedDate }),
      // })
      //   .then((response) => response.json())
      //   .then((result) => {
      //     console.log('Success:', result);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      {/* <Home /> */}
      <EventForm onSubmit={(data) => handleSubmit(data)} />
    </>
  );
}
