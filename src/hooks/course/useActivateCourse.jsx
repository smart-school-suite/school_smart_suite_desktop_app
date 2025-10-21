import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useActivateCourse = (handleClose, courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => activateCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.removeQueries({ queryKey: ["course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Activated!!"}
          description={"Course Activated Successfully"}
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
