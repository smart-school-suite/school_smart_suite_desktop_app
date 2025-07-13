import { getSchoolAnnouncementSettings } from "../../services/announcementSetting";
import { useQuery } from "@tanstack/react-query";

export const useGetAnnouncementSettings = () => {
    return useQuery({
         queryKey:["announcementSettings"],
         queryFn:getSchoolAnnouncementSettings
    })
}