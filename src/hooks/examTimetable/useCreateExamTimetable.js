import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetable } from "../../services/examTimetable";

export const useCreateExamTimetable = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createTimetable,
         onSuccess:(examId) => {
            queryClient.removeQueries({ queryKey:["examTimetable", examId]})
         }
    })
}