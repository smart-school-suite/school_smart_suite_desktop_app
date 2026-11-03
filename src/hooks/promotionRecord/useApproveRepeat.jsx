import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { approveRepeat } from "../../services/promotionRecord";

export const useApproveRepeat = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveRepeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotion-records"] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Repeat Approve"}
          description={
            "Repeat Approved Successfully student will now be set to repeat the current Level"
          }
        />,
      );
    },
  });
};
