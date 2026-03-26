import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
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
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
