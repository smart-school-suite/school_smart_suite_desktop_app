import { getPeriodDuration } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetSemesterTimetablePeriods = () => {
  return useQuery({
    queryKey: ["semester-timetable-periods"],
    queryFn: () => getPeriodDuration(),
  });
};
