import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkDeactivateElectionRole = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Deactivation Successfull"}
          description={"Election Roles Deactivated Successfully"}
        />
      );
    },
  });
};
