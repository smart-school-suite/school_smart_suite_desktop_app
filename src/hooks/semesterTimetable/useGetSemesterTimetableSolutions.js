import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../services/semesterTimetable";

export const SEMESTER_TIMETABLE_SOLUTIONS_KEY = "semester-timetable-solutions";

// Problems and solution options for one version, grouped by day.
// Keyed by version so switching versions never shows stale solutions.
export const useGetSemesterTimetableSolutions = (versionId) => {
  return useQuery({
    queryKey: [SEMESTER_TIMETABLE_SOLUTIONS_KEY, versionId],
    queryFn: () => getSolutions(versionId),
    enabled: !!versionId,
  });
};
