import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitExam } from "../../services/resitExam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteResitExam = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResitExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitExams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Exam Deleted"}
          description={"Exam Deleted Successfully"}
        />,
      );
    },
  });
};
