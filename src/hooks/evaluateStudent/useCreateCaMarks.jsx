import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaMark } from "../../services/evaluateStudent";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetCaScoreState } from "../../Slices/Asynslices/CaScoreSlice";
export const useCreateCaMark = (handleClose) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createCaMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["examResults"] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Scores Summited"}
          description={"Student CA Scores Submitted Successfully"}
        />
      );
      dispatch(resetCaScoreState());
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
