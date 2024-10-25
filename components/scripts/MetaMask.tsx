'use client';

import React, { useEffect, useState } from 'react';

const MetaMask = () => {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);

  const isMetaMaskInstalled = () =>
    typeof window !== 'undefined' && typeof (window as { ethereum?: unknown }).ethereum !== 'undefined';

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      setMetaMaskInstalled(true);
    }
  }, []);

  return (
    <div className="text-center p-4">
      {metaMaskInstalled ? (
        <button className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white px-4 py-1 rounded-full transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
          Connect Wallet
        </button>
      ) : (
        <p className="text-red-500">MetaMask not detected</p>
      )}
    </div>
  );
};

export default MetaMask;