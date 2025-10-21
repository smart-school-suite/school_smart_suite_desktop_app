import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateExam = (handleClose, examId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, updateData }) => updateExam(examId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.removeQueries({ queryKey: ["exam", examId] });

      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Exam Updated Successfully"}
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
