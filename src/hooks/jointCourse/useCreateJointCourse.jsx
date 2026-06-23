import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJointCourse } from "../../services/jointCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useCreateJointCourse = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJointCourse,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Creation Successfull"}
          description={"Joint Course  Created Successfully"}
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
