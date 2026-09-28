import { getStudentAudienceByDepartment } from "../../services/audience";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentAudienceByDepartment = () => {
  return useQuery({
    queryKey: ["student-audience-department"],
    queryFn: () => getStudentAudienceByDepartment(),
  });
};
