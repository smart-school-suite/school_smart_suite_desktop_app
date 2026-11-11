const escapeCsv = (value) => {
  const str = String(value ?? "");
  return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

/**
 * Header names for an import template built from a module's column config.
 * Standard fields use their program_name (which the column matcher
 * recognises automatically). Repeatable groups get one numbered column per
 * field for the group's minimum occurrences, e.g. course_type_1.
 */
export const getImportTemplateHeaders = (columns = []) =>
  columns.flatMap((column) => {
    if (column.type !== "repeatable_group") return [column.program_name];

    const occurrences = Math.max(column.occurrences?.min ?? 1, 1);
    const fields = column.fields ?? [];
    return Array.from({ length: occurrences }, (_, i) =>
      fields.map((field) => `${field.program_name}_${i + 1}`),
    ).flat();
  });

/** CSV text (header row only) for a module's import template. */
export const buildImportTemplateCsv = (columns = []) =>
  `${getImportTemplateHeaders(columns).map(escapeCsv).join(",")}\r\n`;
