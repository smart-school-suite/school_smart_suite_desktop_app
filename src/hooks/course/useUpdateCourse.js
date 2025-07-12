import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../../services/course";

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ courseId, updateData }) => updateCourse(courseId, updateData),
         onSuccess: (courseId) => {
            queryClient.invalidateQueries({ queryKey:["courses"] })
            queryClient.removeQueries({ queryKey:["course", courseId]})
         }
    })
}