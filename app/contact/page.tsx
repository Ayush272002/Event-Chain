'use client';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';

// Define the Event interface including new fields
interface Event {
  EventID: number;
  name: string;
  date: string; // Should ideally be a Date object for better handling
  location: string;
  ticketPrice: number; // Changed to number for sorting
  description: string;
  capacity: number;
  ticketsSold: number;
  imageUrl: string;
  host: string; // New field for host
}

// Dummy function to fetch events
const fetchEvents = (): Event[] => {
  return [
    {
      EventID: 1,
      name: 'Rock Concert',
      date: '2023-12-01',
      location: 'New York City',
      ticketPrice: 99,
      description: 'An exhilarating rock concert featuring famous bands.',
      capacity: 5000,
      ticketsSold: 4500,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Music Mania',
    },
    {
      EventID: 2,
      name: 'Art Expo',
      date: '2023-11-15',
      location: 'San Francisco',
      ticketPrice: 55,
      description: 'A showcase of modern art from around the world.',
      capacity: 300,
      ticketsSold: 260,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Art Lovers',
    },
    {
      EventID: 3,
      name: 'Tech Summit 2023',
      date: '2023-12-10',
      location: 'Chicago',
      ticketPrice: 250,
      description: 'The leading tech summit with top industry speakers.',
      capacity: 2000,
      ticketsSold: 1800,
      imageUrl: 'https://via.placeholder.com/150',
      host: 'Tech Alliance',
    },
  ];
};

const ContactPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Header />
      <div className="relative z-20 container mx-auto p-4 pt-16">
        {/* implement contact page here */}
        <p className="text-white">Page to be implemented</p>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
