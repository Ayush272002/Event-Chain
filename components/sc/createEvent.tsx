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
  const [ticketPrice, setTicketPrice] = useState(0);
  const [eventDate, setEventDate] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [transactionHash, setTransactionHash] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Store the connected wallet address
  const [eventId, setEventId] = useState<number | null>(null); // Store the created event ID

  // Check if the wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts && accounts.length > 0) {
          setIsWalletConnected(true); // Wallet is connected
          setWalletAddress(accounts[0]); // Store the connected wallet address
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
          setWalletAddress(accounts[0]); // Store the connected wallet address
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

      // Convert ticket price from dollars to cents
      const centsTicketPrice = Math.round(ticketPrice * 100); // Assuming ticketPrice is entered in USD cents

      // Call the `createEvent` function, which submits the transaction
      const tx = await contract.createEvent(
        name,
        description,
        capacity,
        centsTicketPrice, // Now this is in cents, e.g storing as 500 cents == 5.00 usd
        unixEventDate,
        images
      );

      console.log('Transaction Submitted:', tx);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash);

      // Extract the `eventId` from the event logs in the receipt
      const eventId = receipt.events?.find(
        (event: ethers.Event) => event.event === 'EventCreated'
      )?.args?.[0];

      if (eventId) {
        setEventId(eventId.toNumber()); // Store the event ID if found
        console.log('Event created successfully with ID:', eventId.toNumber());
      } else {
        console.log('Event ID not found in the logs.');
      }
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
          <p>Connected Wallet: {walletAddress}</p>{' '}
          {/* Display connected wallet address */}
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
          {eventId !== null && <p>Event ID: {eventId}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
