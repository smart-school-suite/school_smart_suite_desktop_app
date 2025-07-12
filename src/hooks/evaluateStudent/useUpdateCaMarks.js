import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCaMark } from "../../services/evaluateStudent";

export const useUpdateCaMarks = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:updateCaMark
    })
}