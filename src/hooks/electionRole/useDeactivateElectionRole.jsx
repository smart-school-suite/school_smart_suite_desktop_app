import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateElectionRole = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (electionRoleId) => deactivateRole(electionRoleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivation Succesfull"}
          description={"Election Role Deactivated Successfully"}
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
