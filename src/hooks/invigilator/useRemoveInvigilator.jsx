import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { removeInvigilator } from "../../services/invigilator";

export const useRemoveInvigilator = (examId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeInvigilator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pot-invigilators", examId] });
      queryClient.invalidateQueries({
        queryKey: ["assigned-invigilators", examId],
      });

      toast.custom(
        <ToastSuccess
          title={"Removal Successfull"}
          description={"Invigilator Removed Successfully"}
        />,
      );
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
