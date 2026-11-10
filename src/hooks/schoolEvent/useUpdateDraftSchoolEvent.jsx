import { updateDraftSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { resetCreateEvent } from "../../Slices/schoolEvent/schoolEventSlice";
export const useUpdateDraftSchoolEvent = (handleClose, handleCloseDrawer) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateDraftSchoolEvent,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["schoolEvents"] });
      queryClient.invalidateQueries({ queryKey: ["schoolEventSummary"] });
      queryClient.invalidateQueries({
        queryKey: ["schoolEvent", variables?.school_event_id],
      });

      if (handleClose) {
        handleClose();
      }
      if (handleCloseDrawer) {
        handleCloseDrawer();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={
            variables?.status === "draft"
              ? "Draft School Event Has Been Updated Successfully"
              : "Draft School Event Has Been Published Successfully"
          }
        />,
      );
      dispatch(resetCreateEvent());
    },
  });
};
