import { useQuery } from "@tanstack/react-query";
import { getLetterGrades } from "../../services/letterGrade";

export const useGetLetterGrades = () => {
    return useQuery({
         queryKey:["letterGrade"],
         queryFn:() => getLetterGrades()
    })
}