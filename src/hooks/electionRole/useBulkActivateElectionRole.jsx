import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useBulkActivateElectionRole = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateRole,
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
          title={"Activation Successfull"}
          description={"Election Role Activated Successfully"}
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
