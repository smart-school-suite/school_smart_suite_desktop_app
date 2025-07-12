import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { bulkActivateCourse } from "../../services/course";

export const useBulkActivateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateCourse,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["courses"] })
             queryClient.invalidateQueries({ queryKey:["activeCourses"] })
         }
    })
}