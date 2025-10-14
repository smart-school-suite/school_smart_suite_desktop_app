import { useQuery } from "@tanstack/react-query";
import { getPastElections } from "../../services/election";
export const useGetPastElections = () => {
    return useQuery({
         queryKey:["pastElections"],
         queryFn:getPastElections
    })
}
