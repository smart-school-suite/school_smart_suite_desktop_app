import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimetable } from "../../services/timetable";

export const updateTimetable = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ updateData }) =>  updateTimetable(updateData),
         onSuccess:(schoolSemesterId) => {
             queryClient.removeQueries({ queryKey:["timetable", schoolSemesterId]});
         }
     })
}