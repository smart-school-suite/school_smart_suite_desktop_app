import { useQuery } from "@tanstack/react-query";
import { getResitCandidates } from "../../services/resitCandidate";

export const useGetResitCandidates = () => {
     return useQuery({
         queryKey:["resit-candidates"],
         queryFn: () => getResitCandidates()
     })
}