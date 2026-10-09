import { useQuery } from "@tanstack/react-query";
import { getStudentAudienceByLevel } from "../../services/audience";

export const useGetStudentAudienceByLevel = () => {
  return useQuery({
    queryKey: ["student-audience-level"],
    queryFn: () => getStudentAudienceByLevel(),
  });
};
