import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitResitScores } from "../../services/resitEvaluation";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { useDispatch } from "react-redux";
import { resetResitScoreState } from "../../Slices/resit/resitEvaluationSlice";
export const useCreateResitScore = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: submitResitScores,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resit-candidates"] });
      queryClient.invalidateQueries({ queryKey: ["student-resits"] });
      queryClient.invalidateQueries({
        queryKey: ["resit-evaluation-helper", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["resit-scores", candidateId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Scores Submitted"}
          description={"Resit Scores Submited Successfully"}
        />,
      );
      dispatch(resetResitScoreState());
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
