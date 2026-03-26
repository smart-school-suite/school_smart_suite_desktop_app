import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { deleteSemesterTimetableVersion } from "../../services/semesterTimetable";

export const useDeleteSemesterTimetableVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSemesterTimetableVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      toast.custom(
        <ToastSuccess
          title={"Timetable Version Deleted"}
          description={
            "The selected timetable version has been successfully deleted."
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
