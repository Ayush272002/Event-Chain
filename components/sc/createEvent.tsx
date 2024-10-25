'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0); // Price in FLR
  const [eventDate, setEventDate] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [transactionHash, setTransactionHash] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Check if the wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts && accounts.length > 0) {
          setIsWalletConnected(true); // Wallet is connected
        } else {
          setIsWalletConnected(false); // Wallet is not connected
        }
      } else {
        alert('Please install MetaMask or another Ethereum wallet');
      }
    };

    checkWalletConnection();
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          console.log('Wallet connected:', accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const handleCreateEvent = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      if (!isWalletConnected) {
        await handleConnectWallet();
      }

      // Get the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect the contract with the signer
      const contract = getContract().connect(signer);

      const unixEventDate = Math.floor(new Date(eventDate).getTime() / 1000); // Convert to Unix timestamp
      const weiTicketPrice = ethers.utils.parseEther(ticketPrice.toString()); // Convert FLR to Wei

      const tx = await contract.createEvent(
        name,
        description,
        capacity,
        weiTicketPrice,
        unixEventDate,
        images
      );
      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash);
      console.log('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      {!isWalletConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <h2>Create Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Ticket Price (FLR)"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
          />
          <input
            type="date"
            placeholder="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Images (comma-separated URLs)"
            value={images.join(',')}
            onChange={(e) => setImages(e.target.value.split(','))}
          />
          <button onClick={handleCreateEvent}>Create Event</button>

          {transactionHash && (
            <p>Transaction successful! Hash: {transactionHash}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
