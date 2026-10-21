import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { cancelPromotionRun } from "../../services/promotion";
export const useCancelPromotionRun = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelPromotionRun,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotion-runs"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Run Cancelled"}
          description={"Promotion Run Cancelled Successfully"}
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
