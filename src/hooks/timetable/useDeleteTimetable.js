import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetable } from "../../services/timetable";

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimetable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolSemesters"] });
      
    },
  });
};
