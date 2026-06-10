import { useMutation } from "@tanstack/react-query";
import { getAvailablePreferenceTeachers } from "../../services/semesterTimetableHelpers";

export const useGetAvailablePreferenceTeachers = () => {
  return useMutation({
    mutationFn: (payload) => getAvailablePreferenceTeachers(payload),
  });
};
