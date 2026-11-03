import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeTeacherCourse } from "../../services/teacherCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useChangeTeacherCourse = (specialtyId, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeTeacherCourse,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      (toast.custom(
        <ToastSuccess
          title={"Change Successfull"}
          description={"Teacher For this course has been changed successfully"}
        />,
      ),
        queryClient.invalidateQueries({
          queryKey: ["course-specialty", specialtyId],
        }));
      queryClient.invalidateQueries({
        queryKey: ["teachersBySpecialty", specialtyId],
      });
    },
  });
};
