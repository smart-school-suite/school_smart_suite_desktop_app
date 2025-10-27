import { useQuery } from "@tanstack/react-query";
import { getSchoolBranchSettingDetails } from "../../services/schoolBranchSetting";

export const useGetSchoolBranchSettingDetails = (schoolBranchSettingId) => {
     return useQuery({
        // queryKey:["schoolBranchSetting", schoolBranchSettingId],
         queryFn:() => getSchoolBranchSettingDetails(schoolBranchSettingId),
        // enabled:!!schoolBranchSettingId
     })
}