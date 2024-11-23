import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const NetworkStatus = ({ checkUrl = 'https://jsonplaceholder.typicode.com/posts', intervalTime = 5000 }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateOnlineStatus = () => {
        const onlineStatus = navigator.onLine;
        if (isOnline !== onlineStatus) {
            setIsOnline(onlineStatus);
            if (onlineStatus) {
                toast.success('You are back online!'); // Notify when online
            } else {
                toast.error('You are offline!'); // Notify when offline
            }
        }
        checkInternetConnection();
    };

    const checkInternetConnection = async () => {
        setLoading(true);
        try {
            const response = await fetch(checkUrl, {
                method: 'HEAD',
                mode: 'no-cors',
            });
            // If request succeeds
            if (response.ok || response.type === 'opaque') {
                setIsOnline(true);
                setError(null);
            } else {
                setIsOnline(false);
                setError('Connection check failed.');
            }
        } catch (err) {
            setIsOnline(false);
            setError(`Error checking connection: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        // Initial check
        checkInternetConnection();
        
        const interval = setInterval(checkInternetConnection, intervalTime);
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            clearInterval(interval);
        };
    }, [checkUrl, intervalTime]);

    return (
        <>
         {toast.success("Checking Connnection status")}
        </>
    );
};

export default NetworkStatus;