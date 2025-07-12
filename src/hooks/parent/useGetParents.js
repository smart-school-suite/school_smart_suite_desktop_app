import { getAllParents } from "../../services/parent";
import { useQuery } from "@tanstack/react-query";

export const useGetAllParents = () => {
    return useQuery({
         queryKey:["parents"],
         queryFn:getAllParents
    })
}