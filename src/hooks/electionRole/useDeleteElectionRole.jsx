import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElectionRole } from "../../services/electionRole";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteElectionRole = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteElectionRole,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Election Role Deleted Successfully"}
        />
      );
    },
  });
};
