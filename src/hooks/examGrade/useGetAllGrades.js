import { useQuery } from "@tanstack/react-query";
import { getAllGrades } from "../../services/examGrade";

export const useGetAllGrades = () => {
    return useQuery({
         queryKey:["examGrades"],
         queryFn:getAllGrades
    })
}