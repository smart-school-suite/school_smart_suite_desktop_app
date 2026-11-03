import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElection } from "../../services/election";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateElection = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ electionId, electionData }) =>
      updateElection(electionId, electionData),
    onSuccess: (electionId) => {
      queryClient.invalidateQueries({ queryKey: ["elections"] });
      queryClient.removeQueries({ queryKey: ["election", electionId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Election Create"}
          description={"Election Created Successfully"}
        />
      );
    },
  });
};
