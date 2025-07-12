import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamMark } from "../../services/evaluateStudent";

export const useUpdateExamMarks = () => {
    return useMutation({
         mutationFn:updateExamMark
    })
}