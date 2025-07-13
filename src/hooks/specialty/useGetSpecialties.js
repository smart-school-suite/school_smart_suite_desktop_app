import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpecialties } from "../../services/specialty";

export const useGetSpecialties = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:getSpecialties,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}