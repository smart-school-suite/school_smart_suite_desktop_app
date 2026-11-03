import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJointCourse } from "../../services/jointCourse";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

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
  });
};
