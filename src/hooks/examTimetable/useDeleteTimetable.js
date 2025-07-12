import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetable } from "../../services/examTimetable";

export const useDeleteTimetable = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteTimetable,
         onSuccess:(examId) => {
            queryClient.invalidateQueries({ queryKey:["examTimetable", examId]})
         } 
    })
}