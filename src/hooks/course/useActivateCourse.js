import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCourse } from "../../services/course";

export const useActivateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(courseId) =>  activateCourse(courseId),
         onSuccess: (courseId) => {
            queryClient.invalidateQueries({ queryKey:["courses"]})
            queryClient.removeQueries({ queryKey:["course", courseId] })
            queryClient.invalidateQueries({ queryKey:["activeCourses"] })
         }
    })
}