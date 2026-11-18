import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDeactivateJointCourses } from "../../services/jointCourse";

export const useBulkDeactivateJointCourse = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateJointCourses,
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
        <ToastSuccess title={"Joint Courses Deactivated"} description={"The selected joint courses are now inactive."} />,
      );
    },
  });
};
