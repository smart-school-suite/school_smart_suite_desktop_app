import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetable } from "../../services/timetable";

export const useCreateTimetable = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createTimetable,
         onSuccess:(schoolSemesterId) => {
             queryClient.invalidateQueries({queryKey:["schoolSemesters"]});
             queryClient.removeQueries({ queryKey:["schoolSemester", schoolSemesterId]});
         }
     })
}