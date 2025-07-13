import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolEventSetting } from "../../services/schoolEvent";

export const useUpdateSchoolEventSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ settingId, updateData }) => updateSchoolEventSetting(settingId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolEventSettings"] })
         }
    })
}