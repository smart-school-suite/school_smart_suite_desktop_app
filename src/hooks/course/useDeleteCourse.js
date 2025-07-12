import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../../services/course";

export const useDeleteCourse = () => {
   const queryClient = useQueryClient();
   return useMutation({
       mutationFn:deleteCourse,
       onSuccess:(courseId) => {
          queryClient.invalidateQueries({ queryKey:["courses"]})
          queryClient.invalidateQueries({ queryKey:["activeCourses"]})
          queryClient.removeQueries({ queryKey:["course", courseId]})
       }
   })
}