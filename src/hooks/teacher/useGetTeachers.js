import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../services/teacher";

// `options` lets callers pass extra react-query options, e.g. { enabled }.
export const useGetTeachers = (options = {}) => {
    return useQuery({
         queryKey: ['teachers'],
         queryFn: () => getTeachers(),
         ...options,
    });
}
