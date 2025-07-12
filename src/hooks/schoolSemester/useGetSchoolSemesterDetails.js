import { useQuery } from "@tanstack/react-query";
import { getSchoolSemesterDetails } from "../../services/schoolSemester";

export const useGetSchoolSemesterDetails = (schoolSemesterId) => {
  return useQuery({
    queryKey: ["schoolSemester", schoolSemesterId],
    queryFn: () => getSchoolSemesterDetails(schoolSemesterId),
    enabled: !!schoolSemesterId,
  });
};
