import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkActivateJointCourses } from "../../services/jointCourse";

export const useBulkActivateJointCourse = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateJointCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joint-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess title={"Joint Courses Activated"} description={"The selected joint courses are now active."} />,
      );
    },
  });
};
