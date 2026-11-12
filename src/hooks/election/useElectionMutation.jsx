import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

/**
 * Mutation used across the election feature: invalidates the given query-key
 * prefixes, shows a success toast and runs the caller's callbacks. Errors are
 * left to the caller (pass `onError: handleServerError` to mutate()).
 */
export const useElectionMutation = ({
  mutationFn,
  invalidate = [],
  successTitle,
  successDescription,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      invalidate.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
      onSuccess?.(data, variables, context);
      if (successTitle) {
        toast.custom(
          <ToastSuccess
            title={successTitle}
            description={
              typeof successDescription === "function"
                ? successDescription(data, variables)
                : successDescription ?? data?.message
            }
          />,
        );
      }
    },
  });
};

// `handleClose` / `resetAll` callbacks most dialogs pass in.
export const closeAfter = (handleClose, resetAll) => () => {
  resetAll?.();
  handleClose?.();
};
