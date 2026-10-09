import { useQuery } from "@tanstack/react-query";
import { getTeacherAudienceByLevel } from "../../services/audience";

export const useGetTeacherAudienceByLevel = () => {
  return useQuery({
    queryKey: ["teacher-level-audience"],
    queryFn: () => getTeacherAudienceByLevel(),
  });
};
