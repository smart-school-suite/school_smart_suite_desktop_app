import { useQuery } from "@tanstack/react-query";
import { getResitExamDetails } from "../../services/resitExam";

export const useGetResitExamDetails = (resitExamId) => {
    return useQuery({
         queryKey:["resitExam", resitExamId],
         queryFn:getResitExamDetails(resitExamId)
    })
}