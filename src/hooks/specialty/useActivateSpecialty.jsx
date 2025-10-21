import { activateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateSpecialty = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(specialtyId) => activateSpecialty(specialtyId),
         onSuccess:(specialtyId) => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
            queryClient.removeQueries({ queryKey:["specialty", specialtyId] })
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess
                  title={"Activation Successfull"}
                  description={"Specialty Activated Successfully"}
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