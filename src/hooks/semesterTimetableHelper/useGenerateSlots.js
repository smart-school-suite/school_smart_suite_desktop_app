import { generateSlots } from "../../services/semesterTimetableHelpers";
import { useMutation } from "@tanstack/react-query";

export const useGenerateSlots = () => {
  return useMutation({
    mutationFn: (payload) => generateSlots(payload),
  });
};
