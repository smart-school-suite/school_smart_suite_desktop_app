import { useQuery } from "@tanstack/react-query";
import { getAudienceGroups } from "../../services/schoolGroup";

export const useGetSchoolGroups = () => {
    return useQuery({
         queryKey:["schoolGroups"],
         queryFn:getAudienceGroups
    })
}