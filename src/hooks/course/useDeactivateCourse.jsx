import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateCourse = (handleClose, courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => deactivateCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.removeQueries({ queryKey: ["course", courseId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Course Deactivated"}
          description={"Course Deactivated Successfully"}
        />
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};
