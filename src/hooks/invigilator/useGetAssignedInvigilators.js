import { useQuery } from "@tanstack/react-query";
import { getInvigilators } from "../../services/invigilator";

export const useGetAssignedInvigilators = (examId) => {
     return useQuery({
         queryKey:["assigned-invigilators", examId],
         queryFn: () => getInvigilators(examId),
         enabled: !!examId
     })
}