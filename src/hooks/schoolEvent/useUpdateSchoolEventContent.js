import { updateSchoolEventContent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSchoolEventContent = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ schoolEventId, updateData }) => updateSchoolEventContent(schoolEventId, updateData),
         onSuccess:(schoolEventId) => {
             queryClient.invalidateQueries({ queryKey:["schoolEvents"] })
             queryClient.removeQueries({ queryKey:["schoolEvent", schoolEventId]})
         }
     })
}