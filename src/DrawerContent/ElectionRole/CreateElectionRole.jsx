import { useRef, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateElectionRole } from "../../hooks/electionRole/useCreateElectionRole";
import { useFormError } from "../../hooks/form/useFormError";
import PositionForm, { positionFromRole, positionToPayload } from "./PositionForm";

function CreateElectionRole({ handleClose, drawerData }) {
  const [form, setForm] = useState(() => positionFromRole({ election_type: drawerData?.electionType }));
  const formRef = useRef();
  const { mutate: createPosition, isPending } = useCreateElectionRole(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Position");

  const handleSubmit = async () => {
    clearFormError();
    if (!(await formRef.current?.validate())) {
      setClientError("Check the position details", "Some fields are missing or invalid.");
      return;
    }
    createPosition(positionToPayload(form), { onError: handleServerError });
  };

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
              {isPending ? <SingleSpinner /> : "Create Position"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateElectionRole;
