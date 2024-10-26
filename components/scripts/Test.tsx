'use client';
import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    console.log('Print some shit');
  }, []);

  return (
    <div>
      <p>Hellao!</p>
    </div>
  );
};

export default Test;
