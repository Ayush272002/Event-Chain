// components/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => (
  <div className="container mx-auto p-4">
    <header className="header text-center mb-8">
      <h1 className="text-4xl font-bold text-blue-700">Ticket Chain</h1>
      <nav className="nav mt-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-blue-500 hover:text-blue-700">
              Events
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-blue-500 hover:text-blue-700">
              Contact
            </Link>
          </li>
          <li>
            <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700">
              Login
            </button>
          </li>
        </ul>
      </nav>
      <input
        type="text"
        placeholder="Search events..."
        className="search-bar mt-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto"
      />
    </header>
  </div>
);

export default Header;
