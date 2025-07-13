import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitResitScores } from "../../services/resitEvaluation";

export const useCreateResitScore = () => {
    return useMutation({
         mutationFn:({candidateId, updateData}) =>  submitResitScores(candidateId, updateData)
    })
}