import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { generateSemesterTimetable } from "../../services/semesterTimetable";
export const useGenerateSemesterTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateSemesterTimetable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      toast.custom(
        <ToastSuccess
          title={"Timetable Generating..."}
          description={
            "Your timetable is being generated with preferences. This may take a while."
          }
        />,
      );
    },
    onError: (error) => {
      // The request may not have reached the server, so the version's real
      // status could have changed; re-read it rather than guessing.
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
    },
  });
};
