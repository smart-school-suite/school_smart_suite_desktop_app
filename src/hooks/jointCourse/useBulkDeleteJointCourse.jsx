import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDeleteJointCourses } from "../../services/jointCourse";

export const useBulkDeleteJointCourse = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteJointCourses,
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
        <ToastSuccess title={"Joint Courses Deleted"} description={"The selected joint courses were deleted successfully."} />,
      );
    },
  });
};
