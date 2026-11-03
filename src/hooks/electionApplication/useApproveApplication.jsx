import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveApplication } from "../../services/electionApplication";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useApproveElectionApplication = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:approveApplication,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"]})
            queryClient.invalidateQueries({ queryKey: ["electionCandidates"] });
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Approval Successfull"}
                   description={"Election Application Approved Successfully"}
                 />
            )
         },
    })
}