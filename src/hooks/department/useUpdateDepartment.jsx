import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateDepartment = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ departmentId, updateData }) => updateDepartment(departmentId, updateData),
         onSuccess:(departmentId) => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
            queryClient.invalidateQueries({ queryKey:["department", departmentId] })
            if(handleClose){
                handleClose();
            }

            toast.custom(
                 <ToastSuccess
                     title={"Department Updated"}
                     description={"Department Updated Successfully"}
                 />
            )

         },
         onError:() => {
            toast.custom(
                <ToastDanger
                   title={"Failed Update"}
                   description={"Failed To update department please try again later"}
                />
            )
         }
    })
}