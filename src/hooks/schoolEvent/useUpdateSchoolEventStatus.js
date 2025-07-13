import { updateSchoolEventStatus } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSchoolEventStatus = () => {
   const queryClient = useQueryClient();
   return useMutation({
        mutationFn: ({ eventId, updateData}) => updateSchoolEventStatus(eventId, updateData),
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolEvent"] })
        }
   })
}