import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateElectionRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkUpdateElectionRoles = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateData }) => bulkUpdateElectionRole(updateData),
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
