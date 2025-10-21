import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamMark } from "../../services/evaluateStudent";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useUpdateExamMarks = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExamMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["examResults"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Exam Scores Updated Successfully"}
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
