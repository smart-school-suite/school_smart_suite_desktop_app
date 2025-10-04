import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateElectionRole = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (electionRoleId) => activateRole(electionRoleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Activation Sucessfull"}
          description={"Election Role Activated Successfully"}
        />
      );
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};
