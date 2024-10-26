'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const BuyTicket = () => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Connect Wallet
  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
          console.log('Wallet connected:', accounts[0]);
        }
      } else {
        alert('Please install MetaMask or another Ethereum wallet');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  // Handle buying a ticket for the event
  const handleBuyTicket = async () => {
    if (!eventId) {
      alert('Please enter a valid Event ID.');
      return;
    }

    try {
      // Get the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract().connect(signer);

      // Call `getEventPriceFlare` to get the ticket cost in FLR
      const ticketCost = await contract.getEventPriceFlare(eventId);
      console.log('Ticket cost in FLR:', ethers.utils.formatEther(ticketCost));

      // Check wallet balance
      const balance = await provider.getBalance(await signer.getAddress());
      console.log('Wallet balance in Wei:', balance.toString());
      console.log('Wallet balance in FLR:', ethers.utils.formatEther(balance)); // Converts to FLR for readability

      if (balance.lt(ticketCost)) {
        alert('Insufficient balance to cover ticket cost and gas fees.');
        return;
      }

      // Proceed with buying the ticket
      const tx = await contract.buyTicket(eventId, { value: ticketCost });
      const receipt = await tx.wait();

      setTransactionHash(receipt.transactionHash);
      console.log(
        'Ticket bought successfully, transaction hash:',
        receipt.transactionHash
      );
    } catch (error) {
      console.error('Error buying ticket:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Buy Ticket</h2>
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
            placeholder="Enter Event ID"
            value={eventId !== null ? eventId : ''}
            onChange={(e) => setEventId(Number(e.target.value))}
            className="border p-2 mb-2"
          />

          <button
            onClick={handleBuyTicket}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Buy Ticket
          </button>

          {transactionHash && (
            <p className="mt-4">
              Transaction successful! Hash: <strong>{transactionHash}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyTicket;
