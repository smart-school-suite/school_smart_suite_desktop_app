import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaMark } from "../../services/evaluateStudent";

export const useCreateCaMark = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createCaMark,
    })
}