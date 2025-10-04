import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElectionRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateElectionRole = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ electionRoleId, updateData }) =>
      updateElectionRole(electionRoleId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Election Role Updated Successfully"}
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
