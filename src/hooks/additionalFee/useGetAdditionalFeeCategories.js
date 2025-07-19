import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeeCategory } from "../../services/additionalFee";

export const useGetAdditionalFeeCategory = () => {
  return useQuery({
    queryKey: ["additionalFeeCategories"],
    queryFn: () => getAdditionalFeeCategory(),
  });
};
