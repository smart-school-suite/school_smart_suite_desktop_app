import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../../services/teacher";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useCreateTeacher = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.custom(
        <ToastSuccess
          title={"Teacher Created Successfully"}
          description={"Teacher Has Been Created Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};
