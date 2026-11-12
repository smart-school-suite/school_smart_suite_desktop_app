import { useRef, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateElection } from "../../hooks/election/useUpdateElection";
import { useFormError } from "../../hooks/form/useFormError";
import ElectionDetailsForm, { detailsFromElection, detailsToPayload } from "./ElectionDetailsForm";

/**
 * Edit an election's details. The type and academic year are locked once
 * applications exist (the API enforces the same rule).
 */
function UpdateElection({ handleClose, drawerData }) {
  const election = drawerData?.election ?? drawerData;
  const [details, setDetails] = useState(() => detailsFromElection(election));
  const formRef = useRef();
  const { mutate: updateElection, isPending } = useUpdateElection(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Election");
  const lockStructure = (election?.applications_count ?? 0) > 0;
  const isPublished = election?.status && election.status !== "draft";

  const handleSave = async () => {
    clearFormError();
    const problems = await formRef.current?.validate();
    if (problems?.length) {
      setClientError("Check the election details", problems);
      return;
    }
    const payload = detailsToPayload(details);
    if (lockStructure) {
      delete payload.election_type_id;
      delete payload.system_academic_year_id;
    }
    updateElection({ electionId: election.id, data: payload }, { onError: handleServerError });
  };

  return (
    <>
      <div className="drawer-content px-2 pt-2 pb-4">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-3" />
        {lockStructure && (
          <div className="bg-old-lace-50 text-old-lace-800 rounded-3 p-2 mb-3 font-size-xs" style={{ lineHeight: 1.55 }}>
            Applications have been submitted, so the election type and academic year can no longer change.
          </div>
        )}
        <ElectionDetailsForm
          ref={formRef}
          value={details}
          onChange={(next) => {
            clearFormError();
            setDetails(next);
          }}
          lockStructure={lockStructure}
          scheduleFutureOnly={!isPublished}
        />
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateElection;
