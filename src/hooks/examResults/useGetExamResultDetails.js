import { useQuery } from "@tanstack/react-query";
import { getResultDetails } from "../../services/examResults";

export const useGetExamResultDetails = (resultId) => {
     return useQuery({
         queryKey:['resultDetails', resultId],
         queryFn:() => getResultDetails(resultId)
     })
}