import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { activateVersion } from "../../services/semesterTimetable";
import { ACTIVATION_CHECK_KEY } from "./useGetActivationCheck";
import { ACTIVE_TIMETABLE_KEY } from "./useGetActiveTimetable";

// POST semester-timetable/version/{id}/activate
// Errors are shown inline by the caller (a 422 conflict carries errors.conflicts).
export const useActivateSemesterTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ versionId }) => activateVersion(versionId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [ACTIVE_TIMETABLE_KEY] });
      queryClient.invalidateQueries({ queryKey: [ACTIVATION_CHECK_KEY] });
      queryClient.invalidateQueries({ queryKey: ["semester-timetable-versions"] });
      toast.custom(
        <ToastSuccess
          title={"Timetable Activated"}
          description={
            response?.data?.message ??
            "The selected timetable version is now the active timetable."
          }
        />,
      );
    },
    onError: (_error, { versionId }) => {
      queryClient.invalidateQueries({ queryKey: [ACTIVATION_CHECK_KEY, versionId] });
    },
  });
};
