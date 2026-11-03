import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { deleteJointCourse } from "../../services/jointCourse";

export const useDeleteJointCourse = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJointCourse,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Joint Course Deleted Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["joint-courses"] });
    },
  });
};
