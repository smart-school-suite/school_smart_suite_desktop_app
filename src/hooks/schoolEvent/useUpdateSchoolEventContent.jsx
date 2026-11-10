import { updateSchoolEventContent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { resetUpdateContent } from "../../Slices/schoolEvent/schoolEventSlice";
export const useUpdateSchoolEventContent = (handleClose, handleCloseDrawer) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ schoolEventId, updateData }) =>
      updateSchoolEventContent(schoolEventId, updateData),
    onSuccess: (_, { schoolEventId }) => {
      queryClient.invalidateQueries({ queryKey: ["schoolEvents"] });
      queryClient.invalidateQueries({ queryKey: ["schoolEvent", schoolEventId] });
      if (handleClose) {
        handleClose();
      }
      if (handleCloseDrawer) {
        handleCloseDrawer();
      }
      dispatch(resetUpdateContent());

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"School Event Content Updated Successfully"}
        />,
      );
    },
  });
};
