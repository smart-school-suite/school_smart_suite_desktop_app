import { useQuery } from "@tanstack/react-query";
import { getDepartmentDetails } from "../../services/department";

export const useGetDepartmentDetails = (departmentId) => {
     return useQuery({
         queryKey: ["department", departmentId],
         queryFn: () => getDepartmentDetails(departmentId),
         enabled: !!departmentId,
     })
}