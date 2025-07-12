import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElectionType } from "../../services/electionType";

export const useDeleteElectionType = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:deleteElectionType,
      onSuccess:() => {
         queryClient.invalidateQueries({ queryKey:["electionTypes"] })
      }
   })
}