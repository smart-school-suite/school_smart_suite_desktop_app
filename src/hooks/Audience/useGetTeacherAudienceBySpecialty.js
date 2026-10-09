import { useQuery } from "@tanstack/react-query";
import { getTeacherAudienceBySpecialty } from "../../services/audience";

export const useGetTeacherAudienceBySpecialty = () => {
  return useQuery({
    queryKey: ["teacher-audience-specialty"],
    queryFn: () => getTeacherAudienceBySpecialty(),
  });
};
