import { useQuery } from "@tanstack/react-query";
import { getExamType } from "../../services/examType";

export const useGetExamTypes = () => {
    return useQuery({
         queryKey:["examTypes"],
         queryFn:() => getExamType()
    })
}