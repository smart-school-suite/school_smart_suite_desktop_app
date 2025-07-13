import { useQuery } from "@tanstack/react-query";
import { getAllResitExams } from "../../services/resitExam";

export const useGetAllResitExams = () => {
    return useQuery({
         queryKey:["resitExams"],
         queryFn:getAllResitExams
    })
}