import { getTimetableSlots } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetTimetableSlots = (versionId) => {
  return useQuery({
    queryKey: ["timetable-slots"],
    queryFn: () => getTimetableSlots(versionId),
  });
};
