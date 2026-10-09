import { useQuery } from "@tanstack/react-query";
import { getStudentAudienceBySpecialty } from "../../services/audience";

export const useGetStudentAudienceBySpecialty = () => {
  return useQuery({
    queryKey: ["student-audience-specialty"],
    queryFn: () => getStudentAudienceBySpecialty(),
  });
};
