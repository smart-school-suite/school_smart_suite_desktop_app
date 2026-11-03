import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteSchoolAdmins = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolAdmin,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})

             if(handleClose){
                handleClose();
             }

             if(resetAll){
               resetAll();
             }
             toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"Account Deleted Successfully"}
                />
             )
         },
    })
}