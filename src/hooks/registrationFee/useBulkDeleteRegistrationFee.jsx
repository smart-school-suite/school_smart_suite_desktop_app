import toast from "react-hot-toast";
import { bulkDeleteRegistrationFee } from "../../services/registrationFee";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkDeleteRegistrationFee = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteRegistrationFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationFees"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Registration Fee Deleted Successfully"}
        />
      );
    },
  });
};
