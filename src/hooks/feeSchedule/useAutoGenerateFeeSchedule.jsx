import { useMutation } from "@tanstack/react-query";
import { autoGenerateFeeSchedule } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useAutoGenerateFeeSchedule = () => {
     return useMutation({
         mutationFn:autoGenerateFeeSchedule,
         onSuccess:() => {
             toast.custom(
                <ToastSuccess 
               title={"Fee Schedule Generated Successfully"}
               description={"Fee Schedule Generated Successfully Please Ensure that all the fields suite your needs before submiting"}
             />
             )
         },
     })
}