import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
