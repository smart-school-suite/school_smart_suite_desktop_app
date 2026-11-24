import { useQuery } from "@tanstack/react-query";
import { getSchoolSemesterCreationOptions } from "../../services/schoolSemester";

export const useGetSchoolSemesterCreationOptions = () => {
  return useQuery({
    queryKey: ["schoolSemesterCreationOptions"],
    queryFn: () => getSchoolSemesterCreationOptions(),
  });
};
