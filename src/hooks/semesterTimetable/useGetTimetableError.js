import { useQuery } from "@tanstack/react-query";
import { getTimetableError } from "../../services/semesterTimetable";

export const useGetTimetableErrors = (versionId) => {
  return useQuery({
    queryKey: ["timetable-errors", versionId],
    queryFn: () => getTimetableError(versionId),
  });
};
