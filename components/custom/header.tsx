'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MetaMask from '../scripts/MetaMask';

const Header = () => {
  const [mouseX, setMouseX] = useState(-1);
  const [mouseY, setMouseY] = useState(-1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleMouseLeave = () => {
    setMouseX(-1);
    setMouseY(-1);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 backdrop-blur-md bg-opacity-60 z-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '1px solid transparent',
          background:
            mouseX >= 0 && mouseY >= 0
              ? `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4), transparent 20%)`
              : 'none',
          backgroundClip: 'padding-box, border-box',
        }}
      ></div>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">TicketChain</h1>
        <nav className="nav">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" legacyBehavior>
                <a
                  className="text-white hover:text-blue-500 transition-colors duration-300"
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/TicketListings" legacyBehavior>
                <a
                  className="text-white hover:text-blue-500 transition-colors duration-300"
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                >
                  Events
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a
                  className="text-white hover:text-blue-500 transition-colors duration-300"
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                >
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
