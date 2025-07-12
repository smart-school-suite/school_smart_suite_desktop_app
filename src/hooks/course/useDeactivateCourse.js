import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateCourse } from "../../services/course";

export const useDeactivateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deactivateCourse,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["activeCourses"] })
            queryClient.invalidateQueries({ queryKey:["courses"] })
         }
    })
}