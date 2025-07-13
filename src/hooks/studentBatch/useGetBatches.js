import { useQuery } from "@tanstack/react-query";
import { getStudentBatch } from "../../services/studentBatch";

export const useGetBatches = () => {
    return useQuery({
         queryKey:["studentBatches"],
         queryFn:getStudentBatch
    })
}