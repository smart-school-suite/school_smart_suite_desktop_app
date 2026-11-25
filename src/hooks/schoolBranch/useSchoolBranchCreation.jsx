import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { getPaymentMethods } from "../../services/paymentMethod";
import { createSchoolBranch, getSchoolBranchCreationOptions } from "../../services/schoolBranch";
import { getSubscriptionPlans } from "../../services/subscription";

export const useGetSchoolBranchCreationOptions = () =>
  useQuery({
    queryKey: ["schoolBranchCreationOptions"],
    queryFn: getSchoolBranchCreationOptions,
  });

export const useGetCountryPlans = (countryId, enabled = true) =>
  useQuery({
    queryKey: ["subscriptionPlans", countryId],
    queryFn: () => getSubscriptionPlans(countryId),
    enabled: Boolean(countryId) && enabled,
  });

export const useGetCountryPaymentMethods = (countryId, enabled = true) =>
  useQuery({
    queryKey: ["paymentMethod", countryId],
    queryFn: () => getPaymentMethods(countryId),
    enabled: Boolean(countryId) && enabled,
  });

export const useCreateSchoolBranch = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchoolBranch,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["school"] });
      queryClient.invalidateQueries({ queryKey: ["schoolBranchCreationOptions"] });
      const { branch, admin } = response?.data ?? {};
      toast.custom(
        <ToastSuccess
          title={`${branch?.name ?? "Branch"} created`}
          description={admin?.email ? `${admin.name} can sign in with ${admin.email}.` : "It's ready to use."}
        />,
      );
      handleClose?.();
    },
  });
};
