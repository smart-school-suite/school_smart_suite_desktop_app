import toast from "react-hot-toast";
import { bulkAddTeacherSpecialtyPreference } from "../../services/teacher";
import { useMutation } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkAddTeacherSpecialtyPreference = (handleClose, resetAll) => {
  return useMutation({
    mutationFn: bulkAddTeacherSpecialtyPreference,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Preference Added"}
          description={"Teacher Specialty Preferences Added Successfully"}
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
