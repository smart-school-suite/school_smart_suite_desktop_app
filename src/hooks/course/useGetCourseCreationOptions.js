import { useQuery } from "@tanstack/react-query";
import { getCourseCreationOptions } from "../../services/course";

export const useGetCourseCreationOptions = () => {
  return useQuery({
    queryKey: ["courseCreationOptions"],
    queryFn: () => getCourseCreationOptions(),
  });
};
