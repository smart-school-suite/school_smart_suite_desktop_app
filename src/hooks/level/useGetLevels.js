import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/level";

export const useGetLevels = () => {
    return useQuery({
         queryKey:["levels"],
         queryFn:() => getLevels()
    })
}