import { getParsedDiagnostics } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetParsedDiagnostics = (versionId) => {
  return useQuery({
    queryKey: ["parsed-semester-timetable-daignostics", versionId],
    queryFn: () => getParsedDiagnostics(versionId),
    enabled: !!versionId,
  });
};
