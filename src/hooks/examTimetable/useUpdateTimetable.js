import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimetable } from "../../services/examTimetable";

export const useUpdateExamTimetable = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn:({ updateData }) => updateTimetable(updateData),
       onSuccess:(examId) => {
         queryClient.removeQueries({ queryKey:["examTimetable", examId]})
       }
    })
}