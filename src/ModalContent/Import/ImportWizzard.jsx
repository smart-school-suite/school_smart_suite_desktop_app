import { ArrowLeft, ArrowRight, FileUp, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { DialogHeader } from "../../components/Modals/ConfirmDialog";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ImportSteps from "../../components/Import/ImportSteps";
import { useFormError } from "../../hooks/form/useFormError";
import { useImportModule } from "../../hooks/import/useImportModule";
import { useImportWizard } from "../../hooks/import/useImportWizard";
import { toApiMapping, reviewRows } from "../../utils/file/importSpreadsheet";
import { IMPORT_CONFIG_MAP } from "../../utils/maps/import/importConfigMap";
import ImportColumnMatch from "./ImportColumnMatch";
import ImportFileUpload from "./ImportFileUpload";
import ImportReview from "./ImportReview";

const STEPS = [
  { step: "upload", label: "Choose file" },
  { step: "match", label: "Match columns" },
  { step: "review", label: "Review" },
];

/**
 * The import dialog every module opens (see the import triggers).
 *
 * rowData:
 *   moduleState    key of the module in IMPORT_CONFIG_MAP ("teachers", "hall"...)
 *   moduleColumns  the module's column config (TEACHER_COLUMNS...)
 *   module         { name, template? }
 *
 * Other props passed by older triggers (redux import actions, preview
 * column defs) are no longer needed and are ignored.
 */
function ImportWizzard({ rowData = {}, handleClose }) {
  const { moduleState, moduleColumns, module = {} } = rowData;
  const config = IMPORT_CONFIG_MAP[moduleState];
  const template = module.template ?? config?.template;
  const moduleName = module.name ?? config?.title?.replace(/ Import$/, "") ?? "Records";

  const wizard = useImportWizard(moduleColumns);
  const [stepIndex, setStepIndex] = useState(0);
  const [confirmingClose, setConfirmingClose] = useState(false);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(`${moduleName} import could not be started`);

  // Without a config the module cannot be imported; say so instead of crashing.
  const importModule = useImportModule(config ? moduleState : null, handleClose);

  const rowsToImport = useMemo(() => {
    if (stepIndex !== 2 || !wizard.sheet) return 0;
    return reviewRows(wizard.sheet.rows, wizard.mapping, wizard.columns).filter((row) => row.__status !== "error").length;
  }, [stepIndex, wizard.sheet, wizard.mapping, wizard.columns]);

  const reachable = [true, wizard.canMatch, wizard.canReview];
  const canJumpTo = (index) => reachable.slice(0, index + 1).every(Boolean);
  const goTo = (index) => {
    if (canJumpTo(index)) {
      clearFormError();
      setStepIndex(index);
    }
  };

  const busy = importModule?.isPending;
  const dirty = Boolean(wizard.file);

  const requestClose = () => {
    if (busy) return;
    if (dirty && !confirmingClose) {
      setConfirmingClose(true);
      return;
    }
    handleClose?.();
  };

  const submit = () => {
    if (!importModule || !wizard.file || busy) return;
    clearFormError();
    importModule.mutate(
      { file: wizard.file, mapping: toApiMapping(wizard.mapping) },
      { onError: handleServerError },
    );
  };

  const primary = [
    { label: "Match columns", icon: ArrowRight, disabled: !wizard.canMatch, action: () => goTo(1), hint: wizard.status === "reading" ? "Reading the file…" : !wizard.canMatch ? "Choose a file to continue" : null },
    { label: "Review rows", icon: ArrowRight, disabled: !wizard.canReview, action: () => goTo(2), hint: wizard.problems.length ? `${wizard.problems.length} left to fix` : null },
    { label: rowsToImport > 0 ? `Import ${rowsToImport.toLocaleString()} ${rowsToImport === 1 ? "row" : "rows"}` : "Nothing to import", icon: UploadCloud, disabled: rowsToImport === 0 || busy, action: submit, hint: null },
  ][stepIndex];

  if (!config || !Array.isArray(moduleColumns) || moduleColumns.length === 0) {
    return (
      <div className="d-flex flex-column font-size-sm">
        <DialogHeader icon={FileUp} title={`Import ${moduleName}`} onClose={handleClose} />
        <div className="p-4 text-iron-600">This import is not available yet. Please contact support.</div>
      </div>
    );
  }

  const StepComponent = [ImportFileUpload, ImportColumnMatch, ImportReview][stepIndex];

  return (
    <div className="d-flex flex-column font-size-sm" style={{ height: "min(86vh, 52rem)" }}>
      <DialogHeader
        icon={FileUp}
        title={`Import ${moduleName}`}
        description={wizard.sheet?.info ? `${wizard.sheet.info.name} · ${wizard.sheet.info.rows.toLocaleString()} rows` : "Add many records at once from a spreadsheet"}
        onClose={requestClose}
        closeDisabled={busy}
      />
      <ImportSteps steps={STEPS} stepIndex={stepIndex} canJumpTo={canJumpTo} navigate={goTo} />

      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto px-3 py-3" style={{ minHeight: 0 }}>
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-3" />
        <StepComponent wizard={wizard} module={{ name: moduleName }} template={template} />
      </div>

      <div className="border-top px-3 py-2 d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
        {confirmingClose ? (
          <div className="d-flex flex-row align-items-center justify-content-between gap-2 w-100" role="alertdialog" aria-label="Discard this import?">
            <span className="text-iron-700">Close and lose the file and column matches?</span>
            <div className="d-flex flex-row gap-2">
              <button type="button" className="border rounded-3 bg-white px-3 py-2 font-size-sm" onClick={() => setConfirmingClose(false)} autoFocus>
                Keep importing
              </button>
              <button type="button" className="border-0 rounded-3 bg-red-500 text-white px-3 py-2 font-size-sm" onClick={() => handleClose?.()}>
                Discard
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="border-0 bg-transparent d-flex flex-row align-items-center gap-1 px-2 py-2"
              onClick={() => (stepIndex === 0 ? requestClose() : goTo(stepIndex - 1))}
              disabled={busy}
            >
              {stepIndex === 0 ? "Cancel" : (<><ArrowLeft size={14} /> Back</>)}
            </button>
            <div className="d-flex flex-row align-items-center gap-3">
              {primary.hint && <span className="text-iron-500 font-size-xs">{primary.hint}</span>}
              <button
                type="button"
                className="border-0 rounded-3 primary-background text-white px-3 py-2 d-flex flex-row align-items-center gap-2"
                onClick={primary.action}
                disabled={primary.disabled}
                style={{ opacity: primary.disabled ? 0.5 : 1, cursor: primary.disabled ? "not-allowed" : "pointer", minWidth: "9rem", justifyContent: "center" }}
              >
                {busy ? <SingleSpinner /> : (<>{primary.label} <primary.icon size={14} /></>)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImportWizzard;
