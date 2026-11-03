import { useMutation } from "@tanstack/react-query";
import { autoGenResitExamTimetable } from "../../services/resitExamTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useAutoGenResitExamTimetable = () => {
  return useMutation({
    mutationFn: autoGenResitExamTimetable,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Exam Timetable Generated"}
          description={"Exam Timetable Generated Successfully"}
        />
      );
    },
  });
};
