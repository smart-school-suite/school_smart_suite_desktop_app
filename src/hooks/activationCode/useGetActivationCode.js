import { useQuery } from "@tanstack/react-query";
import { getSchoolActivationCodes } from "../../services/activationCode";

export const useGetActivationCodes = () => {
     return useQuery({
         queryKey:["activationCodes"],
         queryFn:() => getSchoolActivationCodes()
     })
}