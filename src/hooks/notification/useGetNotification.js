import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../services/notification";
export const useGetNotifications = () => {
    return useQuery({
         queryKey:["notifications"],
         queryFn:() => getAllNotifications(),
         refetchOnMount: true,
         refetchOnWindowFocus: false,
    })
}