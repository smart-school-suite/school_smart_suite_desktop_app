import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetable } from "../../services/examTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteTimetable = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimetable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Exam Timetable Deleted Successfully"}
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
