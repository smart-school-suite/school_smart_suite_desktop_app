import { useQuery } from "@tanstack/react-query";
import { getActiveCourses } from "../../services/course";

export const useGetActiveCourses = () => {
     return useQuery({
        queryKey: ['activeCourses'],
        queryFn: getActiveCourses,
      });
}