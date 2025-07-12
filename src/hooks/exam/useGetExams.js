import { useQuery } from "@tanstack/react-query";
import { getExams } from "../../services/exam";

export const useGetExams = () => {
    return useQuery({
         queryKey:["exams"],
         queryFn:getExams
    })
}