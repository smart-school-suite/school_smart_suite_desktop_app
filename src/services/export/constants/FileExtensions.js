import ExportFormats from "./ExportFormats";

const FileExtensions = Object.freeze({
    [ExportFormats.EXCEL]: "xlsx",
    [ExportFormats.PDF]: "pdf",
    [ExportFormats.CSV]: "csv",
});

export default FileExtensions;