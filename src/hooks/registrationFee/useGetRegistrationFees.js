import { useQuery } from "@tanstack/react-query";
import { getRegistrationFees } from "../../services/registrationFee";

export const useGetRegistrationFees = () => {
    return useQuery({
         queryKey:["registrationFees"],
         queryFn:() => getRegistrationFees()
    })
}
