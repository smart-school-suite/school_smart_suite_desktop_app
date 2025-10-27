import { useQuery } from "@tanstack/react-query";
import { getSchoolBranchSetting } from "../../services/schoolBranchSetting";

export const useGetSchoolBranchSetting = () => {
     return useQuery({
         queryKey:["schoolBranchSettings"],
         queryFn:() => getSchoolBranchSetting()
     })
}