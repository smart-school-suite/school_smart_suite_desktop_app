import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { activateVersion } from "../../services/semesterTimetable";

export const useActivateSemesterTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ versionId }) => activateVersion(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      toast.custom(
        <ToastSuccess
          title={"Version Activated"}
          description={
            "The selected timetable Version has been successfully activated."
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
