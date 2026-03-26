import { useQuery } from "@tanstack/react-query";
import { getActivationCodeUsage } from "../../services/activationCode";

export const useGetActivationCodeUsage = () => {
  return useQuery({
    queryKey: ["activationCodeUsage"],
    queryFn: () => getActivationCodeUsage(),
  });
};
