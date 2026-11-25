import { Download, FileText } from "lucide-react";
import { useMemo } from "react";
import ImportDropzone from "../../components/Import/ImportDropzone";
import { handleGeneratedTemplateDownload, handleTemplateDownload } from "../../utils/file/fileDownload";
import { isGroupRequired, splitColumns } from "../../utils/file/importSpreadsheet";

/**
 * Step 1: choose the file. Says up front which columns the file needs, so
 * people can check their file before going further, and offers the
 * template as the easy way to get it right.
 */
export default function ImportFileUpload({ wizard, module, template }) {
  const { fields, groups } = useMemo(() => splitColumns(wizard.columns), [wizard.columns]);
  const required = [
    ...fields.filter((field) => field.required).map((field) => field.label),
    ...groups.filter(isGroupRequired).map((group) => group.label),
  ];
  const optional = [
    ...fields.filter((field) => !field.required).map((field) => field.label),
    ...groups.filter((group) => !isGroupRequired(group)).map((group) => group.label),
  ];
  const moduleName = module?.name ?? "records";

  const downloadTemplate = () =>
    template
      ? handleTemplateDownload(template.path, template.fileName)
      : handleGeneratedTemplateDownload(
          wizard.columns,
          `${moduleName.toLowerCase().replace(/\s+/g, "_")}_import_template.csv`,
        );

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">Choose the file with your {moduleName.toLowerCase()} data</span>
        <span className="text-iron-500">
          Nothing is saved yet: you will match the columns and check the rows before anything is imported.
        </span>
      </div>

      <ImportDropzone
        status={wizard.status}
        file={wizard.sheet?.info}
        error={wizard.fileError}
        onFile={wizard.chooseFile}
        onClear={wizard.clearFile}
      />

      <div className="row g-3">
        <div className="col-12 col-md-7">
          <div className="border rounded-4 p-3 h-100 d-flex flex-column gap-2 bg-white">
            <span className="fw-semibold d-flex flex-row align-items-center gap-2">
              <FileText size={15} className="text-primary-500" /> What the file needs
            </span>
            {required.length > 0 && (
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-500 font-size-xs">Required columns</span>
                <div className="d-flex flex-row flex-wrap gap-1">
                  {required.map((label) => (
                    <span key={label} className="rounded-pill px-2 py-1 bg-primary-50 text-primary-700 font-size-xs">{label}</span>
                  ))}
                </div>
              </div>
            )}
            {optional.length > 0 && (
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-500 font-size-xs">Optional columns</span>
                <div className="d-flex flex-row flex-wrap gap-1">
                  {optional.map((label) => (
                    <span key={label} className="rounded-pill px-2 py-1 bg-iron-100 text-iron-700 font-size-xs">{label}</span>
                  ))}
                </div>
              </div>
            )}
            <span className="text-iron-500 font-size-xs">The first row must hold the column names. Column names don't need to match exactly.</span>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="border rounded-4 p-3 h-100 d-flex flex-column gap-2 bg-white">
            <span className="fw-semibold">Starting from scratch?</span>
            <span className="text-iron-500 font-size-sm">
              The template has every column named so they match on their own, with example rows to replace.
            </span>
            <button
              type="button"
              onClick={downloadTemplate}
              className="mt-auto border rounded-3 bg-white px-3 py-2 d-flex flex-row align-items-center justify-content-center gap-2 font-size-sm"
            >
              <Download size={15} /> Download template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
