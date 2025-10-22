import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeesPaid } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useUpdateFeesPaid = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeesPaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feesPaid"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Fee Paid updated Successfully"}
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
