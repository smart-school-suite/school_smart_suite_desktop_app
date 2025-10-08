import toast from "react-hot-toast";
import { disqualifyCandidate } from "../../services/electionCandidate";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
