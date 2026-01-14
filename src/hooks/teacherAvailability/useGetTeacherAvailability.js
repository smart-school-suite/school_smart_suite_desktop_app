import { useQuery } from "@tanstack/react-query";
import { getTeacherAvailability } from "../../services/teacherAvailability";

export const useGetTeacherAvailability = () => {
  return useQuery({
    queryKey: ["teacherAvailability"],
    queryFn: () => getTeacherAvailability(),
  });
};
