import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../../services/course";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useDeleteCourse = (handleClose, courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });
      queryClient.removeQueries({ queryKey: ["course", courseId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Course Deleted Successfully"}
        />
      );
    },
  });
};
