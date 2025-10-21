import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoGenerateTimetable } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useAutoGenerateTimetable = () => {
  return useMutation({
    mutationFn: ({ payload, schoolSemesterId }) =>
      autoGenerateTimetable({ payload, schoolSemesterId }),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Timetable Generated !"}
          description={
            "Timetable Generated Successfully Please Verify All Slots Before Submitting"
          }
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
