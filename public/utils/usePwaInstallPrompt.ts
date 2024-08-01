import { useEffect } from 'react';

const usePwaInstallPrompt = () => {
  useEffect(() => {
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('beforeinstallprompt event fired');
      deferredPrompt = e;
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.classList.remove('hidden');
      }
    };

    const handleInstallButtonClick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.addEventListener('click', handleInstallButtonClick);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (installButton) {
        installButton.removeEventListener('click', handleInstallButtonClick);
      }
    };
  }, []);
};

export default usePwaInstallPrompt;
