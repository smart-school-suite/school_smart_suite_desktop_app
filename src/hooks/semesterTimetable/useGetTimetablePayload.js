import { getTimetablePayload } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetTimetablePayload = (versionId) => {
  return useQuery({
    queryKey: ["timetable-payload"],
    queryFn: () => getTimetablePayload(versionId),
  });
};
