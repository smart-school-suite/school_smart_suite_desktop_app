import { useQuery } from "@tanstack/react-query";
import { getTimetableEntryDetails } from "../../services/timetable";

export const useGetTimetableEntryDetails = (entryId) => {
  return useQuery({
    queryKey: ["timetableEntry", entryId],
    queryFn: () => getTimetableEntryDetails(entryId),
    enabled: !!entryId,
  });
};
