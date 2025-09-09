import { useQuery } from "@tanstack/react-query";
import { getGradeConfigDetails } from "../../services/examGrade";
export const useGetGradeConfigDetails = (configId) => {
     return useQuery({
         queryKey:["gradeConfigDetails", configId],
         queryFn:() => getGradeConfigDetails(configId)
     })
}