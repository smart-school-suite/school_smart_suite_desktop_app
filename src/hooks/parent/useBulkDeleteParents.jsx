import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteParents } from "../../services/parent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeleteParents = (resetAll, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteParents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Parent Deleted Successfully"}
        />
      );
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Delete Failed"}
          description={
            "Failed to delete Parent Due to an error please try again"
          }
        />
      );
    },
  });
};
