import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkActivateTeacher = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Activation Successfull"}
          description={"Teacher Accounts Activated Successfully"}
        />
      );
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
