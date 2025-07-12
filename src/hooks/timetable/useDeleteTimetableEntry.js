import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetableEntry } from "../../services/timetable";

export const useDeleteTimetableEntry = () => {
    const queryClient = useQueryClient();
         return useMutation({
             mutationFn:deleteTimetableEntry,
             onSuccess: (deletedTimetableEntryId) => {
                 queryClient.removeQueries({ queryKey:["timetableEntry", deletedTimetableEntryId]})
             }
    })
}