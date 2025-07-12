import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateTimetable } from "../../services/timetable";

export const useGenerateTimetable = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:generateTimetable,
         onSuccess:(schoolSemesterId, data) => {
             queryClient.setQueryData(["specialtyTimetable", schoolSemesterId], data)
         }
     })
}