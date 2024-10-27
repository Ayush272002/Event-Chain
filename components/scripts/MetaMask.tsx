'use client';

import React, { useEffect, useState } from 'react';
import { WalletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className="text-white"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
            >
              {account && `${account.slice(0, 6)}...${account.slice(-4)}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <Button
              variant="destructive"
              onClick={disconnect}
              className="w-full px-4 py-2 text-left hover:bg-muted hover:text-destructive"
            >
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          onClick={connect}
          className="bg-light-purple bg-opacity-75 hover:bg-purple border-0 hover:border-0"
        >
          <WalletIcon
            className="mr-2 h-4 w-4"
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
          />{' '}
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default MetaMaskConnect;
