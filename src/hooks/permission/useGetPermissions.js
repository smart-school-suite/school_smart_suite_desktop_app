import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../../services/permission";

export const useGetPermissions = () => {
    return useQuery({
         queryKey:["permissions"],
         queryFn:getPermissions
    })
}