import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importDepartment } from "../../services/department";
import { useDispatch } from "react-redux";

export const useImportDepartment = (handleClose, setImportReset) => {
  const queryClient = useQueryClient();
  const dipatch = useDispatch();
  return useMutation({
    mutationFn: (payload) => importDepartment(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      if (handleClose) handleClose();
      if (setImportReset) {
        dipatch(setImportReset);
      }
      toast.custom(
        <ToastSuccess
          title={"Import Initiated"}
          description={"Department Importation Initiated Successfully"}
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
