import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResitScores } from "../../services/resitEvaluation";

export const useUpdateResitScores = () => {
    return useMutation({
         mutationFn:({ candidateId, studentResitResultId, updateData }) => updateResitScores(candidateId, studentResitResultId, updateData)
    })
}