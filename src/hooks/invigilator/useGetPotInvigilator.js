import { useQuery } from "@tanstack/react-query";
import { getPotentialInvigilators } from "../../services/invigilator";

export const useGetPotInvigilators = (examId) => {
     return useQuery({
         queryKey:["pot-invigilators", examId],
         queryFn: () => getPotentialInvigilators(examId),
         enabled: !!examId
     })
}