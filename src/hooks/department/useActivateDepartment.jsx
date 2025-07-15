import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateDepartment = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:(departmentId) => activateDepartment(departmentId),
        onSuccess:(departmentId) => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
            queryClient.removeQueries({queryKey:["department", departmentId] })
            if(handleClose){
                handleClose();

            }

            toast.custom(
                <ToastSuccess 
                   title={"Activated"}
                   description={"Department Activated Successfully"}
                />
            )
        },
        onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Activation Failed"}
                  description={"Failed To Activate Department Please Try again"}
                />
            )
        }
    })
}