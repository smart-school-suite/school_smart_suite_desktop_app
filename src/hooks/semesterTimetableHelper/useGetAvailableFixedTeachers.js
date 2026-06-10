import { getAvailableFixedTeachers } from "../../services/semesterTimetableHelpers";
import { useMutation } from "@tanstack/react-query";

export const useGetAvailableFixedTeachers = () => {
  return useMutation({
    mutationFn: (payload) => getAvailableFixedTeachers(payload),
  });
};
