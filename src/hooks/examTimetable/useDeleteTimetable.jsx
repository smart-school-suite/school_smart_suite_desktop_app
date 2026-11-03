import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetable } from "../../services/examTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
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
  });
};
