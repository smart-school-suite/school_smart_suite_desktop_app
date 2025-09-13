import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteSchoolSemesters } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeleteSchoolSemesters = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolSemesters,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["schoolSemesters"]});

            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"School Semester Deleted Successfully"}
                 />
            )
         },
         onError:() => {
              toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete School Semester Please check internet connection and try again"}
                 />
              )
         }
    })
}