import toast from "react-hot-toast";
import { bulkDeleteRegistrationFee } from "../../services/feePayment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

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
