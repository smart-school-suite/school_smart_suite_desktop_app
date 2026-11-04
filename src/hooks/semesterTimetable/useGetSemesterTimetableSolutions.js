import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../services/semesterTimetable";

export const useGetSemesterTimetableSolutions = (versionId) => {
  return useQuery({
    queryKey: ["solutions"],
    queryFn: () => getSolutions(versionId),
  });
};
