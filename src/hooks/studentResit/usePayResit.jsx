import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payResit } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const usePayResit = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payResit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentResits"] });
      queryClient.invalidateQueries({ queryKey: ["resitTransactions"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Transaction Successfull"}
          description={"Transaction Completed Successfully"}
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
