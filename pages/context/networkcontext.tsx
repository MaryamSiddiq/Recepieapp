import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the types for the context values
interface NetworkContextType {
  isOnline: boolean;
  saveDataLocally: (data: any) => void;
  syncDataWithServer: () => void;
}

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  saveDataLocally: () => {},
  syncDataWithServer: () => {},
});

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncDataWithServer();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveDataLocally = async (data: any) => {
    const cache = await caches.open('offline-cache');
    const existingData = await loadOfflineData();
    existingData.push(data);
    await cache.put('offline-data', new Response(JSON.stringify(existingData)));
  };

  const loadOfflineData = async () => {
    const cache = await caches.open('offline-cache');
    const cachedResponse = await cache.match('offline-data');
    if (cachedResponse) {
      const cachedData = await cachedResponse.json();
      return cachedData;
    }
    return [];
  };

  const syncDataWithServer = async () => {
    const offlineData = await loadOfflineData();
    if (offlineData.length > 0) {
      try {
        await Promise.all(
          offlineData.map(async (data: any) => {
            await fetch('/api/your-endpoint', { //dont know what should i add here 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
          })
        );
        const cache = await caches.open('offline-cache');
        await cache.delete('offline-data');
      } catch (error) {
        console.error('Error syncing data:', error);
      }
    }
  };

  return (
    <NetworkContext.Provider value={{ isOnline, saveDataLocally, syncDataWithServer }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
/*
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface NetworkContextType {
  isOnline: boolean;
  saveDataLocally: (data: any) => void;
  syncDataWithServer: () => void;
}

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  saveDataLocally: () => {},
  syncDataWithServer: () => {},
});

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncDataWithServer();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveDataLocally = async (data: any) => {
    try {
      await saveRecipe(data);
    } catch (error) {
      console.error('Error saving data locally:', error);
    }
  };

  const syncDataWithServer = async () => {
    try {
      const offlineData = await getRecipes();
      if (offlineData.length > 0) {
        await Promise.all(
          offlineData.map(async (data: any) => {
            await fetch('http://localhost:3000/api/Addrecepie', { // Ensure this endpoint exists
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
          })
        );
        await clearRecipes();
      }
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  };

  return (
    <NetworkContext.Provider value={{ isOnline, saveDataLocally, syncDataWithServer }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
*/