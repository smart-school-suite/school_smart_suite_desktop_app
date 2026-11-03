import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkCopyGradeScale } from "../../services/gradeScale";
import { resetCopyScaleState } from "../../Slices/academics/gradeScaleSlice";
import { useDispatch } from "react-redux";
export const useBulkCopyGradeScale = (handleClose) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: bulkCopyGradeScale,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Grade Scale Copied"}
          description={"Grade Scale Copied Successfully"}
        />,
      );
      dispatch(resetCopyScaleState());
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["grade-scale-categories"] });
    },
  });
};
