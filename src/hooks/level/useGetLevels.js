import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/level";

/** Offered levels by default; scope "system" for every level of the school's level system. */
export const useGetLevels = (scope) => {
    return useQuery({
         queryKey:["levels", scope ?? "offered"],
         queryFn:() => getLevels(scope)
    })
}