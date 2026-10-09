import { getTeacherAudience } from "../../services/audience";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherAudience = () => {
  return useQuery({
    queryKey: ["teacher-audience"],
    queryFn: () => getTeacherAudience(),
  });
};
