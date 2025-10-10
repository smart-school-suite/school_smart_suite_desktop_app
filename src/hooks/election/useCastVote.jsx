import { castVote } from "../../services/election";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCastVote = (electionId) => {
     //const queryClient = useQueryClient();
     return useMutation({
         mutationFn:castVote,
         onSuccess:() => {
           // queryClient.invalidateQueries({ queryKey:["electionResults", electionId] })
             toast.custom(
                 <ToastSuccess 
                   title={"Vote Cast!"}
                    description={"Vote Cast Successfully"}
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