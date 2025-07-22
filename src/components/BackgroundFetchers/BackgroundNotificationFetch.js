import { useGetNotifications } from "../../hooks/notification/useGetNotification";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../Slices/Asynslices/NotificationSlice";
function NotificationFetcher(){
   const dispatch  = useDispatch();
   const { data, isFetching }  = useGetNotifications();
   if(isFetching){
     return null;
   } 
    if(data){
       dispatch(setNotifications(formatNotifications(data)));
       return null
    }
}
export default NotificationFetcher;


function formatNotifications(rawData) {
    // Ensure rawData and its nested properties exist to prevent errors
    if (!rawData || !rawData.data) {
        console.error("Invalid raw data provided to formatNotifications.");
        return { unread: [], read: [] }; // Return empty arrays for consistency
    }

    const unreadNotifications = rawData.data.unread || [];
    const readNotifications = rawData.data.read || [];

    /**
     * Formats a given ISO 8601 timestamp string into a human-readable "time since" string.
     * @param {string} dateString - The ISO 8601 date string (e.g., "2025-07-20T17:04:59.000000Z").
     * @returns {string} The formatted time string (e.g., "just now", "3 minutes ago").
     */
    const formatTimeSince = (dateString) => {
        if (!dateString) {
            return "N/A"; // Handle cases where dateString might be null or undefined
        }

        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 5) {
            return "just now";
        }
        if (seconds < 60) {
            return `${seconds} seconds ago`;
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        }

        const days = Math.floor(hours / 24);
        if (days < 30) { // Approximation for a month
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }

        const months = Math.floor(days / 30); // Rough approximation
        if (months < 12) {
            return `${months} month${months === 1 ? '' : 's'} ago`;
        }

        const years = Math.floor(days / 365);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    };

    /**
     * Transforms a single raw notification object into the desired format.
     * @param {object} notification - The raw notification object.
     * @returns {object} The formatted notification object.
     */
    const transformNotification = (notification) => {
        // Use optional chaining and nullish coalescing for safe access and default values
        const title = notification.data?.title ?? "";
        const body = notification.data?.body ?? "";

        return {
            id: notification.id,
            read_at: notification.read_at,
            created_at: formatTimeSince(notification.created_at), // Format the created_at timestamp
            updated_at: notification.updated_at,
            title: title || "No Title", // Provide a default if title is empty after coalescing
            body: body || "No Body Content", // Provide a default if body is empty after coalescing
            // Add a flag to easily distinguish between read/unread if needed for UI
            isUnread: notification.read_at === null
        };
    };

    // Transform both unread and read notifications
    const formattedUnread = unreadNotifications.map(transformNotification);
    const formattedRead = readNotifications.map(transformNotification);

    // Return an object with separate unread and read arrays
    return {
        unread: formattedUnread,
        read: formattedRead
    };
}