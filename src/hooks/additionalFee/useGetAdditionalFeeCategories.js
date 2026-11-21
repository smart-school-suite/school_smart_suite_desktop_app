import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeeCategory } from "../../services/additionalFee";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetAdditionalFeeCategory = (options = {}) => {
  return useQuery({
    queryKey: ["additionalFeeCategories"],
    queryFn: () => getAdditionalFeeCategory(),
    // The API answers "no categories yet" with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};
