'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: {
        method: string;
        params?: Array<unknown>; // Use `unknown` instead of `any`
      }) => Promise<unknown>; // Specify a more accurate return type if possible
    };
  }
}

function MetaMaskConnect() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  // Initial check on load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Check if there are any accounts already connected
          const accounts = (await window.ethereum.request({
            method: 'eth_accounts',
          })) as string[];
          if (accounts && accounts.length > 0) {
            setIsConnected(true);
            setAccount(accounts[0]);
            localStorage.setItem('isConnected', JSON.stringify(true));
            localStorage.setItem('account', accounts[0]);
          } else {
            // No connected accounts found; check `localStorage`
            const storedIsConnected = JSON.parse(
              localStorage.getItem('isConnected') || 'false'
            );
            const storedAccount = localStorage.getItem('account') || null;
            setIsConnected(storedIsConnected);
            setAccount(storedAccount);
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Update localStorage whenever connection state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isConnected', JSON.stringify(isConnected));
      localStorage.setItem('account', account || '');
    }
  }, [isConnected, account]);

  const connect = async () => {
    try {
      const accounts = (await window.ethereum?.request({
        method: 'eth_requestAccounts',
      })) as string[];
      if (accounts && accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]);
        localStorage.setItem('isConnected', JSON.stringify(true));
        localStorage.setItem('account', accounts[0]);
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  };

  const disconnect = async () => {
    setIsConnected(false);
    setAccount(null);
    localStorage.setItem('isConnected', JSON.stringify(false));
    localStorage.removeItem('account');
    await window.ethereum?.request({
      method: 'wallet_revokePermissions',
      params: [{ eth_accounts: {} }],
    });
  };

  return (
    <div className="relative">
      {isConnected ? (
        <div>
          <button
            onClick={disconnect}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
          <span>
            {account && `${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        </div>
      ) : (
        <button
          onClick={connect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default MetaMaskConnect;
