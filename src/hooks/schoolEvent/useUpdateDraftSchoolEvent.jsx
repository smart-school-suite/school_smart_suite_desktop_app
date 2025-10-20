import { updateDraftSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useUpdateDraftSchoolEvent = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDraftSchoolEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftSchoolEvent"] });
      queryClient.invalidateQueries({ queryKey: ["schoolEventsschoolEvents"] });
      queryClient.invalidateQueries({ queryKey: ["scheduledSchoolEvent"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Draft school Event has Been Updated Successfully"}
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
