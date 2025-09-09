import { bulkActivateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkActivateSpecialty = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })

            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Activation Successful"}
                   description={"Specialty Activated Successfully"}
                 />
            )
         },
         onError: () => {
             toast.custom(
                <ToastDanger 
                  title={"Activation Failed"}
                  description={"Failed to Activate Specialty Due To An Internal Error, Please Check Internet Connection And Try Again"}
                />
             )
         }
    })
}