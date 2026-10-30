import { useQuery } from "@tanstack/react-query";
import { getPeriodDuration } from "../../services/semesterTimetable";

export const useGetSemesterTimetablePeriods = () => {
  return useQuery({
    queryKey: ["semester-timetable-periods"],
    queryFn: () => getPeriodDuration(),
  });
};
