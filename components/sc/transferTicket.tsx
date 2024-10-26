'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/lib/ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const TransferTicket = () => {
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Handle transferring the ticket
  const handleTransferTicket = async () => {
    if (ticketId !== null) {
      if (ticketId < 0) {
        alert('Please enter a valid Ticket ID.');
        return;
      }
    }
    if (!ethers.utils.isAddress(recipientAddress)) {
      alert('Please enter a valid recipient address.');
      return;
    }

    try {
      // Get the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract().connect(signer);

      // Call `transferTicket` function
      const tx = await contract.transferTicket(ticketId, recipientAddress);
      const receipt = await tx.wait();

      setTransactionHash(receipt.transactionHash);
      console.log(
        'Ticket transferred successfully, transaction hash:',
        receipt.transactionHash
      );
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        'Error transferring ticket. Please check ticket ID or recipient address.'
      );
      console.error('Error transferring ticket:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Transfer Ticket</h2>
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
            placeholder="Enter Ticket ID"
            value={ticketId !== null ? ticketId : ''}
            onChange={(e) => setTicketId(Number(e.target.value))}
            className="border p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="border p-2 mb-2"
          />

          <button
            onClick={handleTransferTicket}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Transfer Ticket
          </button>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {transactionHash && (
            <p className="mt-4">
              Ticket transfer successful! Hash:{' '}
              <strong>{transactionHash}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TransferTicket;
