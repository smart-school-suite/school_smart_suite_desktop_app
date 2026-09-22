import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
import { deleteResitExamScores } from "../../services/resitScore";
export const useDeleteResitScores = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResitExamScores,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitCandidates"] });
      queryClient.invalidateQueries({
        queryKey: ["resit-scores", candidateId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Resit Exam Scores Deleted Successfully"}
        />,
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
