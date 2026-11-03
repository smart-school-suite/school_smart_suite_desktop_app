import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payResit } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const usePayResit = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payResit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-resits"] });
      queryClient.invalidateQueries({ queryKey: ["resit-transactions"] });

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
  });
};
