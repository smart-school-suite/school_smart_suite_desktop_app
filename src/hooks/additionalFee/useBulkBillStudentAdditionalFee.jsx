import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkBillStudentAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkBillStudentAdditionalFee = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkBillStudentAdditionalFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["additional-fees"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Bill Successfull"}
          description={"Student Billed Successfully"}
        />,
      );
    },
  });
};
