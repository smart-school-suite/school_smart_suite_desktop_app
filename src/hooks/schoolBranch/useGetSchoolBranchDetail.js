import { getSchoolBranchDetails } from "../../services/schoolBranch";
import { useQuery } from "@tanstack/react-query";
export const useGetSchoolBranchDetails = () => {
   return useQuery({
       queryKey:['schoolBranch'],
       queryFn:getSchoolBranchDetails
   })
}