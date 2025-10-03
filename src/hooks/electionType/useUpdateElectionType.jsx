import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateElectionType = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ electionTypeId, updateData }) => updateElectionType(electionTypeId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"Election Type Updated Successfully"}
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