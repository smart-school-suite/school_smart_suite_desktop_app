import { useQuery } from "@tanstack/react-query";
import { getAllHos } from "../../services/hos";

export const useGetAllHos = () => {
    return useQuery({
         queryKey:["hos"],
         queryFn:getAllHos
    })
}