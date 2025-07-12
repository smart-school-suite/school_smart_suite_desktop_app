import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetableByAvailability } from "../../services/timetable";

export const useCreateTimetableByPreference = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: createTimetableByAvailability,
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey:["schoolSemesters"]});
             queryClient.removeQueries({ queryKey:["schoolSemester", schoolSemesterId]});
         }
     })
}