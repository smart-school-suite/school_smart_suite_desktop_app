import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResitTimetable } from "../../services/resitExamTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateResitTimetable = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resitExamId, createData }) =>
      createResitTimetable({ resitExamId, createData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitExams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Timetable Created"}
          description={"Timetable Created Successfully"}
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
