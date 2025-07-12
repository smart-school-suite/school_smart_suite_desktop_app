import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../../services/Student";
export const useCreateStudent = () => {
      const queryClient = useQueryClient();
      return useMutation({
         mutationFn:createStudent,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['students'] })
         }
      })
}