import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetableEntry } from "../../services/examTimetable";

export const useDeleteTimetableSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteTimetableEntry,
         onSuccess:(examId) => {
            queryClient.removeQueries({ queryKey:["examTimetable", examId] })
         }
    })
}