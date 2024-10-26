'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const CentsToFlare = () => {
  const [cents, setCents] = useState('');
  const [flareValue, setFlareValue] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Connect Wallet
  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
          console.log('Wallet connected:', accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet');
    }
  };

  // Call centsToFlare function from smart contract
  const handleConvertCentsToFlare = async () => {
    if (!cents) {
      alert('Please enter a value in cents.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = getContract().connect(provider);

      // Convert cents to equivalent FLR
      const flareValueInWei = await contract.centsToFlare(cents);
      const flareValueInEth = ethers.utils.formatEther(flareValueInWei); // Convert Wei to FLR (Ether format)

      setFlareValue(flareValueInEth);
      console.log('Equivalent in FLR:', flareValueInEth);
    } catch (error) {
      console.error('Error converting cents to FLR:', error);
      setFlareValue(null);
    }
  };

  return (
    <div className="p-4">
      <h2>Cents to FLR Converter</h2>
      {!isWalletConnected ? (
        <button
          onClick={handleConnectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          <input
            type="number"
            placeholder="Enter amount in cents"
            value={cents}
            onChange={(e) => setCents(e.target.value)}
            className="border p-2 mb-2"
          />
          <button
            onClick={handleConvertCentsToFlare}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Convert to FLR
          </button>

          {flareValue && (
            <p className="mt-4">
              Equivalent in FLR: <strong>{flareValue} FLR</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CentsToFlare;
