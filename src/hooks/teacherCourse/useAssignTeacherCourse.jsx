import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { assignTeacherCourse } from "../../services/teacherCourse";
export const useAssignTeacherCourse = (specialtyId, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTeacherCourse,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Course Assigned"}
          description={"Teacher Course Assigned Successfully"}
        />,
      );
      queryClient.invalidateQueries({
        queryKey: ["course-specialty", specialtyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["teachersBySpecialty", specialtyId],
      });
    },
  });
};
