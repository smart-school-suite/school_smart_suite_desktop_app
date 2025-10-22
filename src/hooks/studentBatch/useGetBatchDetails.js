import { useQuery } from "@tanstack/react-query";
import { getStudentBatchDetails } from "../../services/studentBatch";

export const useGetStudentBatchDetails = (batchId) => {
     return useQuery({
         queryKey:["studentBatch", batchId],
         queryFn:() =>  getStudentBatchDetails(batchId)
     })
}