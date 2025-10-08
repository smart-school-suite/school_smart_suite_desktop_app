import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkApproveApplications } from "../../services/electionApplication";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkApproveApplications = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkApproveApplications,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"]})
            if(handleClose){
                 handleClose();
            }

            if(resetAll){
                 resetAll();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Approval Successfull"}
                   description={"Election Application Approved Successfully"}
                /> 
            )
         },
         onError:(error) => {
             toast.custom(
                 <ToastDanger
                   title={error.response.data.errors.title}
                   description={error.response.data.errors.description}
                 />
             )
         }
    })
}