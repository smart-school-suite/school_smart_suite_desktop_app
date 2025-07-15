import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecialty } from "../../services/specialty";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateSpecialty = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ specialtyId, updateData }) => updateSpecialty(specialtyId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
            if(handleClose){
                toast.custom(
                     <ToastSuccess
                       title={"Update Successfull"}
                       description={"Specialty Updated Successfully"}
                     />
                )
            }
         },
         onError: () => {
            toast.custom(
                <ToastDanger 
                   title={"Update Failed"}
                   description={"Failed to update Specialty"}
                />
            )
         }
    })
}