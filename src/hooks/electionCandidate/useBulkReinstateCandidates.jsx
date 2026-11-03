import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkReinstateCandidates } from "../../services/electionCandidate";

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
      })
 }