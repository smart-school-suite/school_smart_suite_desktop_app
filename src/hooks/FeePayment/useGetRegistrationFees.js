import { useQuery } from "@tanstack/react-query";
import { getRegistrationFees } from "../../services/feePayment";

export const useGetRegistrationFees = () => {
    return useQuery({
         queryKey:["registrationFee"],
         queryFn:getRegistrationFees
    })
}
