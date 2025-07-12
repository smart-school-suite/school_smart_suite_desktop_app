import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../services/course";

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createCourse,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["courses"] })
            queryClient.invalidateQueries({ queryKey:["activeCourses"] })
         }
    })
}