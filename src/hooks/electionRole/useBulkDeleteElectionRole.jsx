import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteElectionRole = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });

      if (resetAll) {
        resetAll();
      }

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Election Roles Deleted Successfully"}
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
