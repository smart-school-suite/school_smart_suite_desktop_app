import { bulkReinstateCandidates } from "../../services/electionCandidate";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkReinstateCandidates = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
      return useMutation({
         mutationFn:bulkReinstateCandidates,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ["electionCandidates"] });
              if(handleClose){
                 handleClose();
              }

              if(resetAll){
                 resetAll();
              }

              toast.custom(
                 <ToastSuccess 
                   title={"Reinstation Successfull"}
                   description={"Election Candidates Reinstated Successfully"}
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