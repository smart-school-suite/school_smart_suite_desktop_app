import { getActivationCodeType } from "../../services/activationCode";
import { useQuery } from "@tanstack/react-query";

export const useGetActivationCodeTypes = () => {
  return useQuery({
    queryKey: ["activationCodeType"],
    queryFn: () => getActivationCodeType(),
  });
};
