import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteCourse = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["joint-courses"] });
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Course Deleted"}
          description={"Course Deleted Succesfully"}
        />
      );
    },
  });
};
