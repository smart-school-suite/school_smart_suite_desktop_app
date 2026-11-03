import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElection } from "../../services/election";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteElection = (handleClose, electionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteElection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elections"] });
      queryClient.removeQueries({ queryKey: ["election", electionId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Election Created"}
          description={"Election Created Successfully"}
        />
      );
    },
  });
};
