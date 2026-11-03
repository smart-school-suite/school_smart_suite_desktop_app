import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { disqualifyCandidate } from "../../services/electionCandidate";

export const useDisqualifyCandidate = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: disqualifyCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionCandidates"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Disqualification Successfull"}
          description={"Election Candidates Disqualified Successfully"}
        />
      );
    },
  });
};
