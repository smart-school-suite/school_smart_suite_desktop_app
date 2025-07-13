import { useQuery } from "@tanstack/react-query";
import { getSchoolEventSettings } from "../../services/schoolEvent";

export const useGetSchoolEventSettings = () => {
     return useQuery({
         queryKey:["schoolEventSettings"],
         queryFn:getSchoolEventSettings
     })
}