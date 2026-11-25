import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { trackJob } from "../../utils/jobs/jobTracker";
import { getImportConfig } from "../../utils/maps/import/importConfigMap";

/**
 * Uploads an import. The API queues it and returns the job; the job is then
 * followed by JobWatcher, which says when it finished and refreshes the
 * module's data then (not now, when nothing is imported yet).
 */
export const useImportModule = (type, handleClose, setImportReset) => {
  const dispatch = useDispatch();
  const config = getImportConfig(type);

  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: (response) => {
      const job = response?.data;
      trackJob(job, {
        queryKeys: [config.queryKey, ...(config.refreshKeys ?? [])].filter(Boolean),
      });

      if (handleClose) handleClose();
      if (setImportReset) dispatch(setImportReset());

      toast.custom(
        <ToastSuccess
          title={`${job?.title ?? config.title} started`}
          description="The file is being imported in the background. You will be notified when it finishes; follow it under Jobs."
        />,
      );
    },
  });
};
