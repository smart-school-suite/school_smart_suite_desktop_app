import { useQuery } from "@tanstack/react-query";
import { getActiveTimetable } from "../../services/semesterTimetable";

export const ACTIVE_TIMETABLE_KEY = "semester-timetable-active";

// GET semester-timetable/school-semester/{id}/active-timetable
// data: { school_semester_id, semester_still_running, active_version, slot_count, message }
export const useGetActiveTimetable = (schoolSemesterId) => {
  return useQuery({
    queryKey: [ACTIVE_TIMETABLE_KEY, schoolSemesterId],
    queryFn: () => getActiveTimetable(schoolSemesterId),
    enabled: !!schoolSemesterId,
  });
};
