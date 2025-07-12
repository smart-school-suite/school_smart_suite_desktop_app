import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchool } from "../../services/school";

export const useUpdateSchool = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ schoolId, updateData }) => updateSchool(schoolId, updateData),
         onSuccess:(schoolId) => {
             queryClient.removeQueries({ queryKey:["school", schoolId] })
         }
    })
}