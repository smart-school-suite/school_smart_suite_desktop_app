import { useMutation } from "@tanstack/react-query";
import { getAvailableHalls } from "../../services/semesterTimetableHelpers";

export const useGetAvailableHalls = () => {
  return useMutation({
    mutationFn: (payload) => getAvailableHalls(payload),
  });
};
