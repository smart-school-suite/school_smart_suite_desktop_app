import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteSchoolSemesters } from "../../services/schoolSemester";

export const useBulkDeleteSchoolSemesters = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolSemesters,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["schoolSemesters"]});
         }
    })
}