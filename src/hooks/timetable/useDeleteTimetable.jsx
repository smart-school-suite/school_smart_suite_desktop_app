import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimetable } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useDeleteTimetable = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimetable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolSemesters"] });
       if(handleClose){
          handleClose();
       }

       toast.custom(
         <ToastSuccess 
            title={"Timetable Deleted Successfully"}
            description={"Your timetable has been deleted successfully."}
         />
       )
    },
    onError: () => {
      toast.custom(
        <ToastWarning
          title={"Oops Something Went Wrong"}
          description={"Couldn't delete timetable, please try again later."}
        />
      );
    }
  });
};
