import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudentBatch } from "../../services/studentBatch";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteBatch = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudentBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentBatches"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Batch Deleted"}
          description={"Batch Deleted Successfully"}
        />,
      );
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
