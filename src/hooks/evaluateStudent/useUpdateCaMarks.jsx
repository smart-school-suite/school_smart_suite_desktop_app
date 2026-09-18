import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCaMark } from "../../services/evaluateStudent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { resetUpdateState } from "../../Slices/examEvaluation/caEvaluationSlice";
import { useDispatch } from "react-redux";
export const useUpdateCaMarks = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateCaMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({
        queryKey: ["candidate-scores", candidateId],
      });
      queryClient.invalidateQueries({
        queryKey: ["ca-update-helper", candidateId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"CA Scores Updated Successfully"}
        />,
      );

      if (resetUpdateState) {
        dispatch(resetUpdateState());
      }
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
