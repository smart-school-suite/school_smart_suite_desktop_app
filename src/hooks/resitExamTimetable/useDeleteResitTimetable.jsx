import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitTimetable } from "../../services/resitExamTimetable";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteResitTimetable = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resitExamId) => deleteResitTimetable(resitExamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitExams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Timetable deleted Successfully"}
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
