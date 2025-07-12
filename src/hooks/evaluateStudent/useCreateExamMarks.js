import { createExamMark } from "../../services/evaluateStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExamMarks = () => {
     return useMutation({
         mutationFn:createExamMark
     })
}