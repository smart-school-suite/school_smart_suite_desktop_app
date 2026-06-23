import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJointCourse } from "../../services/jointCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useUpdateJointCourse = (handleClose, jointCourseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ hallId, updateData }) => updateHall(hallId, updateData),
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
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
