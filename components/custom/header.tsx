'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MetaMask from '../scripts/MetaMask';

const Header = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 backdrop-blur-md bg-opacity-60 z-50"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '1px solid transparent',
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4), transparent 20%)`,
          backgroundClip: 'padding-box, border-box',
        }}
      ></div>
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Ticket Chain</h1>
        <nav className="nav">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" legacyBehavior>
                <a className="text-white hover:text-blue-500 transition-colors duration-300">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/events" legacyBehavior>
                <a className="text-white hover:text-blue-500 transition-colors duration-300">
                  Events
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="text-white hover:text-blue-500 transition-colors duration-300">
                  Contact
                </a>
              </Link>
            </li>
            <li>
              <MetaMask />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
