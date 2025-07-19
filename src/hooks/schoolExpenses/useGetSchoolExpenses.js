import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../services/schoolExpenses";

export const useGetExpenses = () => {
    return useQuery({
         queryKey:["schoolExpenses"],
         queryFn:() => getExpenses()
    })
}