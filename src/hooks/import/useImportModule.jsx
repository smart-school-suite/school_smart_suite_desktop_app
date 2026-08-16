import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { getImportConfig } from "../../utils/maps/import/importConfigMap";
import { useDispatch } from "react-redux";

export const useImportModule = (type, handleClose, setImportReset) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const config = getImportConfig(type);
  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.queryKey });
      if (handleClose) handleClose();
      if (setImportReset) dispatch(setImportReset);

      toast.custom(
        <ToastSuccess
          title={config.successTitle}
          description={config.successDescription}
        />,
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error?.response?.data?.errors?.title ?? "Import Failed"}
          description={
            error?.response?.data?.errors?.description ?? "Something went wrong"
          }
        />,
      );
    },
  });
};
