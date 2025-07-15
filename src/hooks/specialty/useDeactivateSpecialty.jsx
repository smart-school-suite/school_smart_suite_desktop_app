import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateSpecialty } from "../../services/specialty";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateSpecialty = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(specialtyId) => deactivateSpecialty(specialtyId),
         onSuccess:(specialtyId) => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
            queryClient.removeQueries({ queryKey:["specialty", specialtyId] })
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess  
                  title={"Deactivation Successfull"}
                  description={"Department Deactivated Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Deactivation Failed"}
                  description={"Failed to Deactivated Specialty"}
                />
             )
         }
    })
}