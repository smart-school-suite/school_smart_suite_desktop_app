import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchoolSemester } from "../../services/schoolSemester";

export const useDeleteSchoolSemester = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteSchoolSemester,
         onSuccess:(schoolSemesterId) => {
             queryClient.invalidateQueries({ queryKey:["schoolSemesters"]})
             queryClient.removeQueries({ queryKey:["schoolSemester", schoolSemesterId]})
         }
    })
}