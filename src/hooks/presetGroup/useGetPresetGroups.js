import { getPresetGroups } from "../../services/presetGroup";
import { useQuery } from "@tanstack/react-query";

export const useGetPresetGroups = () => {
    return useQuery({
        queryKey:["presetGroups"],
        queryFn:getPresetGroups
    })
}