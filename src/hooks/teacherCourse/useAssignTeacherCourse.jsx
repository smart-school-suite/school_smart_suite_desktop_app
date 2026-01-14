import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { assignTeacherCourse } from "../../services/teacherCourse";
export const useAssignTeacherCourse = (teacherId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTeacherCourse,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Course Assigned"}
          description={"Teacher Course Assigned Successfully"}
        />
      );
      queryClient.removeQueries(["assignableTeacherCourses", teacherId]);
      queryClient.removeQueries(["assignedTeacherCourses", teacherId]);
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        />
      );
    },
  });
};
