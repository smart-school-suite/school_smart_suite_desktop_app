import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchool } from "../../services/school";

export const useDeleteSchool = () => {
    const queryClient = useDeleteSchool();
    return useMutation({
         mutationFn:deleteSchool,
    })
}

