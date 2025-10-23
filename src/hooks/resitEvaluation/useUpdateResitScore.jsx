import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResitScores } from "../../services/resitEvaluation";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateResitScores = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, updateData }) =>
      updateResitScores(candidateId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["studentResits"] });
      queryClient.invalidateQueries({ queryKey: ["resitScores", candidateId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Resit Scores Updated Successfully"}
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
