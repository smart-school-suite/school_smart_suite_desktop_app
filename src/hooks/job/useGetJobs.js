import { getJobs } from "../../services/job";
import { useMutation } from "@tanstack/react-query";

export const useGetJobs = (options = {}) => {
  return useMutation({
    mutationFn: (params) => getJobs(params),
    ...options,
  });
};