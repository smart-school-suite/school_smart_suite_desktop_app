import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { assignInvigilators } from "../../services/invigilator";
import { resetAssignInvigilatorState } from "../../Slices/exam/examInvigilatorSlice";
import { useDispatch } from "react-redux";
export const useAssignInvigilators = (examId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: assignInvigilators,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pot-invigilators", examId] });
      queryClient.invalidateQueries({ queryKey: ["assigned-invigilators", examId] });

      toast.custom(
        <ToastSuccess
          title={"Assignment Successfull"}
          description={"Invigilator Assigned Successfully"}
        />,
      );

      dispatch(resetAssignInvigilatorState())
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
