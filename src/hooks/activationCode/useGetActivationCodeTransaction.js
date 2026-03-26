import { useQuery } from "@tanstack/react-query";
import { getActivationCodeTransactions } from "../../services/activationCode";

export const useGetActivationCodeTransaction = () => {
  return useQuery({
    queryKey: ["activationCodeTransactions"],
    queryFn: () => getActivationCodeTransactions(),
  });
};
