import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaMark } from "../../services/evaluateStudent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useCreateCaMark = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createCaMark,
         onSuccess:() => {
             queryClient.invalidateQueries({queryKey:["examCandidates"]})
             if(handleClose){
                handleClose();
             }
             toast.custom(
                <ToastSuccess 
                  title={"Scores Summited"}
                  description={"Student CA Scores Submitted Successfully"}
                />
             )
         },
         onError:() =>{
             toast.custom(
                <ToastWarning 
                  title={"Failed Submit"}
                  description={"Failed To Submit Student Scores due to an error please try again"}
                />
             )
         }
    })
}