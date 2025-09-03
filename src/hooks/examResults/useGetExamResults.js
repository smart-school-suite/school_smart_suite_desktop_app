import { useQuery } from "@tanstack/react-query";
import { getExamResults } from "../../services/examResults";

export const useGetExamResults = () => {
     return useQuery({
         queryFn:getExamResults,
         queryKey:["examResults"]
     })
}