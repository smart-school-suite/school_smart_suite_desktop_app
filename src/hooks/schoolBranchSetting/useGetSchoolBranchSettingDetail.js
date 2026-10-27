import { useQuery } from "@tanstack/react-query";
import { getSettingDetails } from "../../services/schoolBranchSetting";

export const useGetSchoolBranchSettingDetails = (settingId) => {
     return useQuery({
         queryKey:["schoolBranchSetting", settingId],
         queryFn:() => getSettingDetails(settingId),
          enabled:!!settingId
     })
}