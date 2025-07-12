import { useQuery } from "@tanstack/react-query";
import { getAccessedCoursesWithLettergrades } from "../../services/evaluateStudent";

export const useGetAccessedCoursesLetterGrades = (examId) => {
    return useQuery({
         queryKey:["accessedCoursesLetterGrade", examId],
         queryFn:getAccessedCoursesWithLettergrades(examId)
    })
}