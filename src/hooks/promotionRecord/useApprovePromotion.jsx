import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { approvePromotion } from "../../services/promotionRecord";

export const useApprovePromotion = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approvePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotion-records"] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Promotion Approve"}
          description={
            "Promotion Approved Successfully student will now be promoted to the next class"
          }
        />,
      );
    },
  });
};
