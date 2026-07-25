export const EXPORT_FORMAT = Object.freeze({
  PDF: "pdf",
  CSV: "csv",
  EXCEL: "excel",
});

export const EXPORT_EXTENSION = Object.freeze({
  PDF: "pdf",
  CSV: "csv",
  EXCEL: "xlsx",
});

export const EXPORT_MIMETYPE = Object.freeze({
  PDF: "application/pdf",
  CSV: "text/csv",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

export const EXPORT_LABEL = Object.freeze({
  PDF: "Pdf",
  CSV: "Csv",
  EXCEL: "Excel",
});

export const EXPORT_FORMAT_META = Object.freeze({
  [EXPORT_FORMAT.PDF]: {
    label: EXPORT_LABEL.PDF,
    extension: EXPORT_EXTENSION.PDF,
    mimeType: EXPORT_MIMETYPE.PDF,
  },

  [EXPORT_FORMAT.CSV]: {
    label: EXPORT_LABEL.CSV,
    extension: EXPORT_EXTENSION.CSV,
    mimeType: EXPORT_MIMETYPE.CSV,
  },

  [EXPORT_FORMAT.EXCEL]: {
    label: EXPORT_LABEL.EXCEL,
    extension: EXPORT_EXTENSION.EXCEL,
    mimeType: EXPORT_MIMETYPE.EXCEL,
  },
});
