import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteCourse } from "../../services/course";

export const useBulkDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteCourse,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["courses"] })
             queryClient.invalidateQueries({ queryKey:["activeCourses"] })
         }
    })
}