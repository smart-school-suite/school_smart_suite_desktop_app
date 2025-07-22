import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllNotificationAsRead } from "../../services/notification";

export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: markAllNotificationAsRead,      
    });
}