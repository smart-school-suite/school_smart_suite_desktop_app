import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAssignedTeacherCourse } from "../../services/teacherCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useRemoveAssignedTeacherCourse = (specialtyId, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAssignedTeacherCourse,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      (toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Teacher Assigned Courses Removed Successfully"}
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
