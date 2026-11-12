import { Ban, Lock, Rocket, Trash2 } from "lucide-react";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useCancelElection } from "../../hooks/election/useCancelElection";
import { useCloseElectionVoting } from "../../hooks/election/useCloseElectionVoting";
import { useDeleteElection } from "../../hooks/election/useDeleteElection";
import { usePublishElection } from "../../hooks/election/usePublishElection";
import { useFormError } from "../../hooks/form/useFormError";

// Each dialog receives the election as rowData (ModalButton convention).

function LifecycleDialog({ rowData, handleClose, useAction, fallbackTitle, onSuccessNavigate, ...copy }) {
  const { mutate, isPending } = useAction(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(fallbackTitle);
  return (
    <ConfirmDialog
      {...copy}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
      onConfirm={() => {
        clearFormError();
        mutate(rowData?.id, { onError: handleServerError, onSuccess: onSuccessNavigate });
      }}
    />
  );
}

export function PublishElectionDialog(props) {
  return (
    <LifecycleDialog
      {...props}
      useAction={usePublishElection}
      fallbackTitle="Failed To Publish Election"
      icon={Rocket}
      title="Publish election"
      description="Publishing makes the election visible to its participants. Applications open and voting starts automatically on the scheduled dates."
      confirmLabel="Publish Election"
    />
  );
}

export function CloseVotingDialog(props) {
  return (
    <LifecycleDialog
      {...props}
      useAction={useCloseElectionVoting}
      fallbackTitle="Failed To Close Voting"
      icon={Lock}
      title="Close voting now"
      description="Voting ends immediately, before the scheduled close time. Voters who have not voted yet will not be able to. You can then review and publish the results."
      confirmLabel="Close Voting"
      tone="danger"
    />
  );
}

export function CancelElectionDialog(props) {
  return (
    <LifecycleDialog
      {...props}
      useAction={useCancelElection}
      fallbackTitle="Failed To Cancel Election"
      icon={Ban}
      title="Cancel election"
      description="The election stops for everyone. Applications, candidates and ballots are kept for history, but nobody can apply or vote any more. This cannot be undone."
      confirmLabel="Cancel Election"
      cancelLabel="Keep Election"
      tone="danger"
    />
  );
}

export function DeleteElectionDialog(props) {
  return (
    <LifecycleDialog
      {...props}
      useAction={useDeleteElection}
      fallbackTitle="Failed To Delete Election"
      icon={Trash2}
      title="Delete election"
      description="This permanently deletes the election and its applications. Only drafts or cancelled elections without ballots can be deleted."
      confirmLabel="Delete Election"
      tone="danger"
    />
  );
}
