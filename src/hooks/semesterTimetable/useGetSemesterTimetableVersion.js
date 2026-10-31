import { useQuery } from "@tanstack/react-query";
import { getSemesterTimetableVersions } from "../../services/semesterTimetable";
import {
  GENERATION_POLL_INTERVAL_MS,
  isGenerating,
} from "../../utils/semesterTimetable/schedulerStatus";

export const useGetSemesterTimetableVersions = (schoolSemesterId) => {
  return useQuery({
    queryKey: ["semester-timetable-versions", schoolSemesterId],
    queryFn: () => getSemesterTimetableVersions(schoolSemesterId),
    enabled: !!schoolSemesterId,
    // Fallback for lost realtime events: keep checking the server while any
    // version is still generating, and stop once none are.
    refetchInterval: (query) =>
      query.state.data?.data?.some(isGenerating)
        ? GENERATION_POLL_INTERVAL_MS
        : false,
    refetchIntervalInBackground: true,
  });
};
