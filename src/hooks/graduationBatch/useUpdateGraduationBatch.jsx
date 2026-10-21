import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { updateGraduationBatch } from "../../services/graduationBatch";

export const useUpdateGraduationBatch = (handleClose, batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, batchId }) => updateGraduationBatch(payload, batchId),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Graduation Batch Updated Successfully"}
        />
      );
      if(handleClose){
         handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["graduation-batches"] });
      queryClient.invalidateQueries({ queryKey: ["graduation-batch", batchId] });
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