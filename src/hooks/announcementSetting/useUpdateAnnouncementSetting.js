import { updateSchoolAnnouncementSetting } from "../../services/announcementSetting";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAnnouncementSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ announcementSettingId, updateData }) => updateSchoolAnnouncementSetting(announcementSettingId, updateData),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["announcementSettings"] })
        }
    })
}