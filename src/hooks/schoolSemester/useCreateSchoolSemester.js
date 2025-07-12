import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolSemester } from "../../services/schoolSemester";

export const createSchoolSemester = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createSchoolSemester,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolSemesters"]})
         }
     })
}