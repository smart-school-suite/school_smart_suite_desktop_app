import { updateSchoolEventContent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateSchoolEventContent = (handleClose, schoolEventId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ schoolEventId, updateData }) =>
      updateSchoolEventContent(schoolEventId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolEvents"] });
      queryClient.removeQueries({ queryKey: ["schoolEvent", schoolEventId] });
      queryClient.invalidateQueries({ queryKey: ["draftSchoolEvent"] });
      queryClient.invalidateQueries({ queryKey: ["scheduledSchoolEvent"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"School Event Content Updated Successfully"}
        />
      );
    },
  });
};
