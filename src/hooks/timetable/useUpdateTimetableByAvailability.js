import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimetableByAvailability } from "../../services/timetable";

export const useUpdateTimetableByAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => updateTimetableByAvailability(updateData),
         onSuccess:(schoolSemesterId) => {
            queryClient.removeQueries({ queryKey:["timetable", schoolSemesterId]});
         }
    })
}