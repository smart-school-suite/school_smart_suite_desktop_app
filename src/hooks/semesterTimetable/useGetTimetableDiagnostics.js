import { useQuery } from "@tanstack/react-query";
import { getTimetableDiagnostics } from "../../services/semesterTimetable";

export const useGetSemesterTimetableDiagnostics = (timetableVersionId) => {
  return useQuery({
    queryKey: ["semester-timetable-diagnostics", timetableVersionId],
    queryFn: () => getTimetableDiagnostics(timetableVersionId),
  });
};
