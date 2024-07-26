"use client"
/*import React from 'react';
import Frontpage from '../../pages/frontpage';
import { NetworkProvider } from '../../pages/context/networkcontext';

const App: React.FC = () => {
  return (
    <NetworkProvider>
      <Frontpage />
    </NetworkProvider>
  );
};

export default App;*/
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Frontpage from '../../pages/frontpage';
import { NetworkProvider } from '../../pages/context/networkcontext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  return (
    <NetworkProvider>
     <Frontpage/>
    </NetworkProvider>
  );
};

export default MyApp;
