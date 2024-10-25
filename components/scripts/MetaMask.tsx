'use client';

import React, { useEffect, useState } from 'react';
import { useSDK, MetaMaskProvider } from '@metamask/sdk-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function WalletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function MetaMaskConnect() {
  const { sdk, connected, connecting, account } = useSDK();
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);

  const isMetaMaskInstalled = () =>
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      setMetaMaskInstalled(true);
    }
  }, []);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  if (!metaMaskInstalled) {
    return (
      <Button
        onClick={() =>
          window.open('https://metamask.io/download.html', '_blank')
        }
        className="bg-gradient-to-r from-blue-500 to-indigo-700"
      >
        Install MetaMask
      </Button>
    );
  }

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button>{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <button
              onClick={disconnect}
              className="w-full px-4 py-2 text-left text-destructive hover:bg-muted"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default function MetaMaskConnectWrapper() {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'My App',
          url: typeof window !== 'undefined' ? window.location.href : '',
        },
      }}
    >
      <MetaMaskConnect />
    </MetaMaskProvider>
  );
}
