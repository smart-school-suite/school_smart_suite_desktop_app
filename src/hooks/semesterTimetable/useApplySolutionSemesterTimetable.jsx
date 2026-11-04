import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { applySolution } from "../../services/semesterTimetable";
export const useApplySemesterTimetableSolutions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applySolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      toast.custom(
        <ToastSuccess
          title={"Solution Applied"}
          description={
            "Solutions Have Been Applied a new timetable version will now be created with your corrections"
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
