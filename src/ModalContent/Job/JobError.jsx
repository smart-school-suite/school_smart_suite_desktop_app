import { Icon } from "@iconify/react";
import { useImportDepartment } from "../../hooks/department/useImportDepartment";
import { useDeleteDepartment } from "../../hooks/department/useDeleteDepartment";
import { useImportModule } from "../../hooks/import/useImportModule";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function JobError({ handleClose, rowData }) {
  const { jobId } = rowData;
  const { mutate: importModule, isPending } = useImportModule(
    "specialty",
    handleClose,
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError();
  const handleImport = async () => {
    clearFormError();
    importModule({
      mapping: { email: "email", phone: "phone" },
      file: { size: 1024 },
    }, { onError: handleServerError });
  };
  return (
    <>
      <FormErrorBanner
        ref={errorBannerRef}
        error={formError}
        onDismiss={clearFormError}
        className="mb-2"
      />
      <div className="d-flex flex-row align-items-center justify-content-between w-100">
        <span className="m-0">Job Error</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
        <button
          className="btn btn-primary font-size-sm"
          onClick={() => handleImport()}
        >
          {isPending ? "Loading...." : "Import Module"}
        </button>
      </div>
    </>
  );
}
export default JobError;
