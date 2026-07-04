import ExportFormats from "./ExportFormats";

/**
 * MIME types for supported export formats.
 */

const MimeTypes = Object.freeze({
    [ExportFormats.EXCEL]:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    [ExportFormats.PDF]:
        "application/pdf",

    [ExportFormats.CSV]:
        "text/csv",
});

export default MimeTypes;