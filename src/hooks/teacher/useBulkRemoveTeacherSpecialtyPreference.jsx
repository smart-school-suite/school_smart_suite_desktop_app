import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkRemoveTeacherSpecialtyPreference } from "../../services/teacher";
export const useBulkRemoveTeacherSpecialtyPreference = (
  handleClose,
  resetAll
) => {
  return useMutation({
    mutationFn: bulkRemoveTeacherSpecialtyPreference,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Preference Removed"}
          description={"Teacher Specialty Preferences Removed Successfully"}
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
