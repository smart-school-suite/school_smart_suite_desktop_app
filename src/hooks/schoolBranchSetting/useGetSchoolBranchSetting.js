import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/schoolBranchSetting";

export const useGetSchoolBranchSetting = () => {
     return useQuery({
         queryKey:["settings"],
         queryFn:() => getSettings()
     })
}