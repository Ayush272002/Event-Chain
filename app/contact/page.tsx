'use client';
import React from 'react';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';

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
