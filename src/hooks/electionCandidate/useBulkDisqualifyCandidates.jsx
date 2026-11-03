import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDisqualifyCandidates } from "../../services/electionCandidate";
export const useBulkDisqualifyCandidates = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDisqualifyCandidates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionCandidates"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
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
