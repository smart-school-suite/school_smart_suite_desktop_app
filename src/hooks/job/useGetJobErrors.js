import { getJobErrors } from "../../services/job";
import { useQuery } from "@tanstack/react-query";

export const useGetJobErrors = (jobId) => {
     return useQuery({
         queryKey:["job-errors"],
         queryFn: () => getJobErrors(jobId)
     })
} 