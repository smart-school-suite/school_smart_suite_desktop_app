import { useQuery } from "@tanstack/react-query";
import { getExamCandidates } from "../../services/examCandidate";

export const useGetExamCandidates = () => {
    return useQuery({
        queryKey:["examCandidates"],
        queryFn:() => getExamCandidates()
    })
}