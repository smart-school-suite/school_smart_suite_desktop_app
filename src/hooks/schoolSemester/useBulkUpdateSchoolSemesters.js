import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateSchoolSemester } from "../../services/schoolSemester";

export const useBulkUpdateSchoolSemester = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => bulkUpdateSchoolSemester(updateData),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolSemesters"]});
         }
    })
}