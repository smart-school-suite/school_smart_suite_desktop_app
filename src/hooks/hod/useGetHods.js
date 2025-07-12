import { getAllHods } from "../../services/hod";
import { useQuery } from "@tanstack/react-query";

export const useGetHods = () => {
    return useQuery({
         queryKey:["hods"],
         queryFn:getAllHods
    })
}