import { deactivateStudentBatch } from "../../services/studentBatch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateBatch = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId) => deactivateStudentBatch(batchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentBatches"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivated"}
          description={"Student Batch Deactivated Successfully"}
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
