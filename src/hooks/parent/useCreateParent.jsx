import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParent } from "../../services/parent";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateParent = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createParent,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["parents"]})
            if(handleClose){
                handleClose();
            }
            
            toast.custom(
                <ToastSuccess 
                  title={"Parent Created"}
                  description={"Parent Created Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Parent Creation Failed"}
                  description={"Failed To create Parent Due to an error please try again"}
                />
            )
         }
    })
}