import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
