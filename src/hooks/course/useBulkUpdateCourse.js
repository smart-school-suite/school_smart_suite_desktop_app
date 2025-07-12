import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateCourse } from "../../services/course";

export const useBulkUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(updateData) => bulkUpdateCourse(updateData),
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["courses"] })
            queryClient.invalidateQueries({ queryKey:["activeCourses"] })
         }
    })
}