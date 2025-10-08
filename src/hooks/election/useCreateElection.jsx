import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElection } from "../../services/election";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateElection = (handleClose) => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createElection,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["elections"]})
             if(handleClose){
                 handleClose();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Election Created"}
                   description={"Election Created Successfully"}
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