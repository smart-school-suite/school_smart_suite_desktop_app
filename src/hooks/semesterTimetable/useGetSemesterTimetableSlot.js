import { useQuery } from "@tanstack/react-query";
import { getSemesterTimetableSlots } from "../../services/semesterTimetable";

export const useGetSemesterTimetableSlots = (versionId) => {
  return useQuery({
    queryKey: ["semester-timetable-slots", versionId],
    queryFn: () => getSemesterTimetableSlots(versionId),
  });
};
