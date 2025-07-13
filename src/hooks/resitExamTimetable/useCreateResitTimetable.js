import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResitTimetable } from "../../services/resitExamTimetable";

export const useCreateResitTimetable = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(resitExamId, createData) => createResitTimetable(resitExamId, createData),
         onSuccess:(resitExamId) => {
             queryClient.invalidateQueries({ queryKey:["resitExams"] })
             queryClient.removeQueries({ queryKey:["resitExam", resitExamId] })
         }
    })
}