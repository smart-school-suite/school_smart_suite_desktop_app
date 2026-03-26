import { useQuery } from "@tanstack/react-query";
import { getSemesterTimetableVersions } from "../../services/semesterTimetable";

export const useGetSemesterTimetableVersions = (schoolSemesterId) => {
  return useQuery({
    queryKey: ["semester-timetable-versions", schoolSemesterId],
    queryFn: () => getSemesterTimetableVersions(schoolSemesterId),
  });
};
