import { Fragment, useEffect, useRef, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import EmptyState from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetElectionRoleDetails } from "../../hooks/electionRole/useGetElectionRoleDetails";
import { useUpdateElectionRole } from "../../hooks/electionRole/useUpdateElectionRole";
import { useFormError } from "../../hooks/form/useFormError";
import { serverErrorCopy } from "../../utils/election/electionDisplay";
import PositionForm, { positionFromRole, positionToPayload } from "./PositionForm";

function UpdateElectionRole({ drawerData, handleClose }) {
  const electionRoleId = drawerData?.id;
  const { data, isLoading, error } = useGetElectionRoleDetails(electionRoleId);
  const [form, setForm] = useState(null);
  const formRef = useRef();
  const { mutate: updatePosition, isPending } = useUpdateElectionRole(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Position");

  useEffect(() => {
    if (data?.data && !form) setForm(positionFromRole(data.data));
  }, [data, form]);

  const handleSubmit = async () => {
    clearFormError();
    if (!(await formRef.current?.validate())) {
      setClientError("Check the position details", "Some fields are missing or invalid.");
      return;
    }
    updatePosition({ electionRoleId, data: positionToPayload(form) }, { onError: handleServerError });
  };

  if (isLoading || (!form && !error)) {
    return (
      <div className="drawer-content px-2 pt-3 d-flex flex-column gap-2">
        {[...Array(6)].map((_, index) => (
          <Fragment key={index}>
            <RectangleSkeleton height="0.8rem" width="25%" />
            <RectangleSkeleton height="2.4rem" width="100%" />
          </Fragment>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="drawer-content px-2">
        <EmptyState mascot="error" height="100%" mascotHeight="6rem" {...serverErrorCopy(error, "Unable to load the position", "Something went wrong while loading this position.")} />
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content px-2 pt-2 pb-4">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-3" />
        <PositionForm ref={formRef} value={form} onChange={(next) => { clearFormError(); setForm(next); }} />
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>Cancel</button>
            <button type="button" className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2" onClick={handleSubmit} disabled={isPending}>
              {isPending ? <SingleSpinner /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateElectionRole;
