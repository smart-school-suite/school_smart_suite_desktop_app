import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitTimetable } from "../../services/resitExamTimetable";

export const useDeleteResitTimetable = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(resitExamId) => deleteResitTimetable(resitExamId),
         onSuccess:(resitExamId) => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
            queryClient.removeQueries({ queryKey:["resitExam", resitExamId] })
         }
    })
}