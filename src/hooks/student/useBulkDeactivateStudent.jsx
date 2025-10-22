import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeactivateStudent = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivated Successfully"}
          description={"Student Account Deactivated Successfully"}
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
