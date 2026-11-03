import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJointCourse } from "../../services/jointCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useUpdateJointCourse = (handleClose, jointCourseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, updateData }) =>
      updateJointCourse(courseId, updateData),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Joint Course Updated Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["joint-courses"] });
    },
  });
};
