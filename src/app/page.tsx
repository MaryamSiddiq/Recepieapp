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
import { NetworkProvider } from '../../pages/context/networkcontext';
import Frontpage from '../../pages/frontpage';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }

    const handleOnline = () => {
      console.log('Back online');
      window.location.reload(); // Reload the page when back online
    };

    const handleOffline = () => {
      console.log('Went offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkProvider>
         <Frontpage />
    </NetworkProvider>
  );
};

export default MyApp;
/*import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { NetworkProvider } from '../../pages/context/networkcontext';
import Frontpage from '../../pages/frontpage';
import usePwaInstallPrompt from '../../public/utils/usePwaInstallPrompt';

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePwaInstallPrompt(); // Use the hook to manage the install prompt

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }

    const handleOnline = () => {
      console.log('Back online');
      window.location.reload(); // Reload the page when back online
    };

    const handleOffline = () => {
      console.log('Went offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkProvider>
      <Frontpage />
      
    </NetworkProvider>
  );
};

export default MyApp;
*/