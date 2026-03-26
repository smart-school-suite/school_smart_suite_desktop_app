import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { createSemesterTimetableVersion } from "../../services/semesterTimetable";

export const useCreateSemesterTimetableVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSemesterTimetableVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      toast.custom(
        <ToastSuccess
          title={"Timetable Version Created"}
          description={
            "The new timetable version has been successfully created."
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
