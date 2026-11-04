import { useQuery } from "@tanstack/react-query";
import { activationCheck } from "../../services/semesterTimetable";

export const ACTIVATION_CHECK_KEY = "activation-check";

// GET semester-timetable/version/{id}/activation-check
// data: { version, can_activate, slot_count, replaces, conflicts[] }
// Refused with a 422 when the version is not ready or the semester has ended.
export const useGetActivationCheck = (versionId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: [ACTIVATION_CHECK_KEY, versionId],
    queryFn: () => activationCheck(versionId),
    enabled: !!versionId && enabled,
    retry: false,
    staleTime: 0,
  });
};
