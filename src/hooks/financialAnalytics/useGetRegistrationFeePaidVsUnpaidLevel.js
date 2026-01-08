import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeePaidVsUnPaidLevel } from "../../services/financialAnalytics";

export const useGetRegistrationFeePaidVsUnPaidLevel = async (year) => {
     return useQuery({
         queryKey:["registrationFeePaidVsUnpaidLevel", year],
         queryFn:() => getRegistrationFeePaidVsUnPaidLevel(year)
     })
}