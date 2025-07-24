
import { generateTimetable } from "../../services/timetable";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGenerateTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateTimetable,
    onSuccess: (data) => {
      queryClient.setQueryData(['specialtyTimetable'], data);
    },
    onError: (error) => {
      console.error('Error generating timetable:', error);
    }
  });
};
