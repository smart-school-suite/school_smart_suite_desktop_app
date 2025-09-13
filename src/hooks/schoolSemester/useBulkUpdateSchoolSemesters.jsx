import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateSchoolSemester } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkUpdateSchoolSemester = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateSchoolSemester,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolSemesters"]});

             if(handleClose){
                 handleClose();
             }

             if(resetAll){
                 resetAll();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"School Semester Updated Successfully"}
                 />
             )
         },
         onError:() => {
              toast.custom(
                 <ToastDanger 
                   title={"Update Failed"}
                   description={"Failed to update school semester due to an error please check internet connection and try again"}
                 />
              )
         }
    })
}