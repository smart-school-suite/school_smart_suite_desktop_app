import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        unreadNotificationCount: 0,
        unreadNotifications: [],
        readNotifications: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            const { unread, read } = action.payload;

            state.unreadNotifications = unread || [];
            state.readNotifications = read || [];
            state.unreadNotificationCount = state.unreadNotifications.length;
        },

        addNotification: (state, action) => {
            const newNotification = {
                ...action.payload,
                isUnread: true,
                read_at: null, 
            };

            state.unreadNotifications.unshift(newNotification);
            state.unreadNotificationCount = state.unreadNotifications.length;
        },

        markNotificationAsRead: (state, action) => {
            const notificationIdToMark = action.payload;

            const unreadIndex = state.unreadNotifications.findIndex(
                (notification) => notification.id === notificationIdToMark
            );

            if (unreadIndex !== -1) {
                const [notificationToMove] = state.unreadNotifications.splice(unreadIndex, 1);

                notificationToMove.isUnread = false;
                notificationToMove.read_at = new Date().toISOString(); 
                state.readNotifications.unshift(notificationToMove);

                state.unreadNotificationCount = state.unreadNotifications.length;
            }
        },


        markAllNotificationsAsRead: (state) => {
            const now = new Date().toISOString();
            const newlyReadNotifications = state.unreadNotifications.map((notification) => ({
                ...notification,
                isUnread: false,
                read_at: now, 
            }));

            state.readNotifications.unshift(...newlyReadNotifications);

            state.unreadNotifications = [];

            state.unreadNotificationCount = 0;
        },
    },
});

export const {
    setNotifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;
