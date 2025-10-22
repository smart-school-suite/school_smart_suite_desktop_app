import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentBatch } from "../../services/studentBatch";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useCreateStudentBatch = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudentBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentBatches"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Batch Created"}
          description={"Student Batch Created Successfully"}
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
