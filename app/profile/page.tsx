'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from '../../components/custom/header';
import Footer from '../../components/custom/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EventManagerABI from '../../contracts/EventManagerABI.json';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!RPC_URL || !CONTRACT_ADDRESS) {
  console.error(
    'Missing environment variables. Please check your .env.local file.'
  );
}

export default function ProfilePage() {
  const [isClient, setIsClient] = useState(false);
  const [userTickets, setUserTickets] = useState<number[]>([]);
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [networkName, setNetworkName] = useState('');

  useEffect(() => {
    setIsClient(true);
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        console.log('Network:', network);
        setNetworkName(network.name);
      } catch (error) {
        console.error('Failed to get network:', error);
      }
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        await fetchUserTickets(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('Please install MetaMask!');
    }
    setLoading(false);
  };

  const fetchUserTickets = async (address: string) => {
    if (!RPC_URL || !CONTRACT_ADDRESS) {
      setError('Missing configuration. Please contact support.');
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        EventManagerABI,
        provider
      );

      console.log('Fetching tickets for address:', address);

      const tickets = await contract.getUserTickets(address);
      console.log('Raw tickets data:', tickets);

      if (Array.isArray(tickets)) {
        const ticketNumbers = tickets.map((ticket: ethers.BigNumber) =>
          ticket.toNumber()
        );
        console.log('Processed ticket numbers:', ticketNumbers);
        setUserTickets(ticketNumbers);
      } else {
        console.error('Unexpected response from getUserTickets:', tickets);
        setError('Unexpected response from contract. Please try again.');
      }
    } catch (error) {
      console.error('Failed to fetch user tickets:', error);
      setError(`Failed to fetch user tickets: ${(error as Error).message}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Header />
      <div className="relative z-20 container mx-auto p-4 pt-16">
        <div className="relative min-h-screen overflow-hidden">
          {isClient && (
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/BGVid2.mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}

          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

          <div className="relative z-20 text-white">
            <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
            {userAddress ? (
              <p className="mb-4">Connected Address: {userAddress}</p>
            ) : (
              <p className="mb-4">Not connected</p>
            )}
            <p className="mb-4">Current Network: {networkName}</p>

            {error && (
              <div className="bg-red-500 text-white p-2 rounded mb-4">
                {error}
              </div>
            )}

            <Card className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>Your Tickets</CardTitle>
                <CardDescription>
                  Here are the tickets associated with your wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : userTickets.length > 0 ? (
                  <ul>
                    {userTickets.map((ticketId) => (
                      <li key={ticketId} className="mb-2">
                        Ticket ID: {ticketId}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You don&apos;t have any tickets yet.</p>
                )}
              </CardContent>
            </Card>

            <Button className="mt-4" onClick={connectWallet} disabled={loading}>
              {loading
                ? 'Connecting...'
                : userAddress
                  ? 'Refresh Tickets'
                  : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
