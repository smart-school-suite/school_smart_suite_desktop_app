import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../services/electionApplication";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteApplications = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteApplication,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"] })

            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Election Application Deleted Successfully"}
                 />
            )
         },
    })
}