import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseActivationCode } from "../../services/activationCode";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const usePurchaseActivationCode = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: purchaseActivationCode,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["activationCodes"] });
      toast.custom(
        <ToastSuccess
          title={"Purchase Successfull"}
          description={"Activation Code Purchase Successfully"}
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
