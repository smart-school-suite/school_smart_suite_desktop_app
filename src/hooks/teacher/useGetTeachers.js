import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../services/teacher";

export const useGetTeachers = () => {
    return useQuery({
         queryKey: ['teachers'],
         queryFn: getTeachers,
    });
}