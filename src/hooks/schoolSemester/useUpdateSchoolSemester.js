import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolSemester } from "../../services/schoolSemester";

export const useUpdateSchoolSemester = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({schoolSemesterId, updateData}) => updateSchoolSemester(schoolSemesterId, updateData),
         onSuccess: (schoolSemesterId) => {
             queryClient.invalidateQueries({ queryKey:["schoolSemesters"]})
             queryClient.removeQueries(["schoolSemester", schoolSemesterId])
         }
     })
}