'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const MetaMask = () => {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const isMetaMaskInstalled = () =>
    typeof window !== 'undefined' &&
    typeof (window as { ethereum?: unknown }).ethereum !== 'undefined';

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      setMetaMaskInstalled(true);
    }
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum && window.ethereum.request) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]); // Set the first account
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert(
        'MetaMask is not installed. Please install MetaMask and try again.'
      );
    }
  };

  return (
    <div className="text-center p-4">
      {metaMaskInstalled ? (
        <div>
          {account ? (
            <p className="text-green-500">Connected: {account}</p>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white px-4 py-1 rounded-full transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Connect Wallet
            </button>
          )}
        </div>
      ) : (
        <button
          // Install Metamask extension if not already installed
          onClick={() =>
            window.open('https://metamask.io/download.html', '_blank')
          }
          className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white px-4 py-1 rounded-full transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          Install MetaMask to connect wallet
        </button>
      )}
    </div>
  );
};

export default MetaMask;
