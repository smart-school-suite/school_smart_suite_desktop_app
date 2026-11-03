import { bulkDeleteSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteSpecialty = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSpecialty,
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
                   title={"Specialty Deleted"}
                   description={"Specialty Deleted Succesfully"}
                />
            )
         },
    })
}