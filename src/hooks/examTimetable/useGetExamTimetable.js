import { useQuery } from "@tanstack/react-query";
import { generateExamTimetable } from "../../services/examTimetable";

export const useGetExamTimetable = (examId) => {
    return useQuery({
         queryKey:["examTimetable", examId],
         queryFn:() => generateExamTimetable(examId),
         enabled:!!examId
    })
}