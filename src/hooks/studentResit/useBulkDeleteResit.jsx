import { bulkDeleteStudentResit } from "../../services/studentResit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteStudentResit = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteStudentResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })

            if(handleClose){
                 handleClose();
            }

            if(resetAll){
                 resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                    title={"Delete Successful"}
                    description={"Resit Deleted Successfully"}
                  />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete resit due to an error please check internet connection and try again later"}
                 />
             )
         }
    })
}