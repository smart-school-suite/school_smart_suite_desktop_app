import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetableEntry } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useDeleteTimetableEntry = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimetableEntry,
    onSuccess: (deletedTimetableEntryId) => {
      queryClient.removeQueries({
        queryKey: ["timetableEntry", deletedTimetableEntryId],
      });
      toast.custom(
        <ToastSuccess
          title={"Timetable Entry Deleted Successfully"}
          description={"Your timetable entry has been deleted successfully."}
        />
      )
    },
    onError: () => {
      toast.custom(
        <ToastWarning
          title={"Oops Something Went Wrong"}
          description={"Couldn't delete timetable entry, please try again later."}
        />
      );
    },
  });
};
