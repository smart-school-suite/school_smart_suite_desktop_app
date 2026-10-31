import { getTimetableSlots } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetTimetableSlots = (versionId) => {
  return useQuery({
    queryKey: ["timetable-slots", versionId],
    queryFn: () => getTimetableSlots(versionId),
    enabled: !!versionId,
  });
};
