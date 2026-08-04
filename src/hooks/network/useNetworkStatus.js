import { useState, useEffect, useRef } from 'react';

function useNetworkStatus(debounceMs = 500) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateStatus = (status) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsOnline((prev) => (prev === status ? prev : status));
      }, debounceMs);
    };

    const handleOnline = () => updateStatus(true);
    const handleOffline = () => updateStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [debounceMs]);

  return isOnline;
}

export default useNetworkStatus;