'use client';

import React, { useEffect } from 'react';

const MetaMask = () => {
  const isMetaMaskInstalled = () =>
    typeof (window as { ethereum?: unknown }).ethereum !== 'undefined';

  useEffect(() => {
    console.log('Print something');
  }, []);

  // TODO FIX! This is not working :(
  const metaMaskInstalled = isMetaMaskInstalled();
  //console.log(metaMaskInstalled);

  return (
    <div className="text-center p-4">
      {metaMaskInstalled ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <p>MetaMask not detected</p>
      )}
    </div>
  );
};

export default MetaMask;
