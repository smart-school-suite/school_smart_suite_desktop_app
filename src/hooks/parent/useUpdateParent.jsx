import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParent } from "../../services/parent";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useUpdateParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ parentId, updateData }) => updateParent(parentId, updateData),
         onSuccess:(parentId) => {
            queryClient.invalidateQueries({queryKey:["parents"]})
            queryClient.removeQueries({ queryKey:["parent", parentId] })

            toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Parent Updated Successfully"}
                />
            )
         },

         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Failed Updating Parent Due to an error please try gain"}
                />
            )
         }
    })
}