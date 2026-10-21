import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { retryPromotionRun } from "../../services/promotion";
export const useRetryPromotionRun = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: retryPromotionRun,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotion-runs"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Run Initiated "}
          description={"Promotion Run Initiated Successfully"}
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
