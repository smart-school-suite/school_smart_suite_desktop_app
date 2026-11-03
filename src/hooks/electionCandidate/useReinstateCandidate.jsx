import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { reinstateCandidate } from "../../services/electionCandidate";

export const useReinstateCandidate = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reinstateCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionCandidates"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Reinstation Successfull"}
          description={"Election Candidates Reinstated Successfully"}
        />
      );
    },
  });
};
