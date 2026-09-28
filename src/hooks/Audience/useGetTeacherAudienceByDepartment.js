import { useQuery } from "@tanstack/react-query";
import { getTeacherAudienceByDepartment } from "../../services/audience";

export const useGetTeacherAudienceByDepartment = () => {
  return useQuery({
    queryKey: ["teacher-audience-department"],
    queryFn: () => getTeacherAudienceByDepartment(),
  });
};
