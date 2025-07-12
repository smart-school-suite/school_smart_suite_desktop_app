import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/course";

export const useGetCourses = () => {
     return useQuery({
            queryKey: ['courses'],
            queryFn: getCourses,
    });
}