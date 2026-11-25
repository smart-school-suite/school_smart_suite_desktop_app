import Papa from "papaparse";
import * as XLSX from "xlsx";

/**
 * Everything the import wizard needs from a spreadsheet, read once:
 * its headers and its rows as { header: value } objects.
 *
 * Every failure is an ImportFileError with a message written for the person
 * importing, so the wizard can show it instead of crashing or alerting.
 */

/** Limits the API enforces; checked here so a bad file is caught at once. */
export const IMPORT_LIMITS = {
  maxBytes: 10 * 1024 * 1024,
  maxRows: 5000,
  extensions: ["csv", "xlsx", "xls"],
};

export class ImportFileError extends Error {
  constructor(title, description) {
    super(title);
    this.title = title;
    this.description = description;
  }
}

export const formatFileSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const extensionOf = (name = "") => name.split(".").pop().toLowerCase();

const isBlank = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const readAs = (file, method) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = () => reject(reader.error);
    reader[method](file);
  });

/** Rows of cells for either format. */
const readCells = async (file, extension) => {
  if (extension === "csv") {
    const text = await readAs(file, "readAsText");
    const { data } = Papa.parse(String(text ?? "").replace(/^﻿/, ""), {
      skipEmptyLines: "greedy",
    });
    return data;
  }

  const buffer = await readAs(file, "readAsArrayBuffer");
  const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) return [];
  // raw: false gives the text as Excel displays it (no 79.98999999 floats).
  return XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
};

/**
 * Header names, trimmed. Blank headers become "Column 3" and repeated ones
 * get a suffix ("Phone (2)"), so every column can be told apart.
 */
const uniqueHeaders = (cells) => {
  const seen = new Map();
  return cells.map((cell, index) => {
    let name = isBlank(cell) ? `Column ${index + 1}` : String(cell).trim();
    const count = seen.get(name.toLowerCase()) ?? 0;
    seen.set(name.toLowerCase(), count + 1);
    if (count > 0) name = `${name} (${count + 1})`;
    return name;
  });
};

/**
 * Check and read a spreadsheet.
 * @returns {Promise<{headers: string[], rows: object[], info: {name, size, rows}}>}
 * @throws {ImportFileError}
 */
export const parseImportFile = async (file) => {
  if (!file) {
    throw new ImportFileError("No file chosen", "Choose a CSV or Excel file to import.");
  }

  const extension = extensionOf(file.name);
  if (!IMPORT_LIMITS.extensions.includes(extension)) {
    throw new ImportFileError(
      "This file type can't be imported",
      `"${file.name}" is not a CSV or Excel file. Save it as .csv or .xlsx and try again.`,
    );
  }

  if (file.size > IMPORT_LIMITS.maxBytes) {
    throw new ImportFileError(
      "The file is too large",
      `It is ${formatFileSize(file.size)}; the limit is 10 MB. Split it into smaller files and import them one after the other.`,
    );
  }

  let cells;
  try {
    cells = await readCells(file, extension);
  } catch {
    throw new ImportFileError(
      "The file could not be read",
      "It may be damaged or protected by a password. Open it, save a new copy and try again.",
    );
  }

  const filled = (cells ?? []).filter((row) => Array.isArray(row) && row.some((cell) => !isBlank(cell)));
  if (filled.length === 0) {
    throw new ImportFileError("The file is empty", "Add a header row and at least one row of data, then try again.");
  }

  const headers = uniqueHeaders(filled[0]);
  const rows = filled.slice(1).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, isBlank(row[index]) ? "" : String(row[index]).trim()])),
  );

  if (rows.length === 0) {
    throw new ImportFileError("The file has no data", "Only a header row was found. Add the data under it and try again.");
  }

  if (rows.length > IMPORT_LIMITS.maxRows) {
    throw new ImportFileError(
      "The file has too many rows",
      `It has ${rows.length.toLocaleString()} rows; one import takes at most ${IMPORT_LIMITS.maxRows.toLocaleString()}. Split it and import the parts one after the other.`,
    );
  }

  return {
    headers,
    rows,
    info: { name: file.name, size: formatFileSize(file.size), rows: rows.length },
  };
};

/* ---------------------------------------------------------------- mapping */

export const normalizeHeader = (value) =>
  String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

let instanceCounter = 0;
const newInstanceId = () => `instance-${Date.now()}-${(instanceCounter += 1)}`;

/** Standard fields and repeatable groups of a module's column config. */
export const splitColumns = (columns = []) => ({
  fields: columns.filter((column) => column.type !== "repeatable_group"),
  groups: columns.filter((column) => column.type === "repeatable_group"),
});

const groupLimits = (group) => ({
  min: Math.max(group.occurrences?.min ?? 1, 1),
  max: Math.max(group.occurrences?.max ?? 5, 1),
});

/** A group is required when it must have at least one set and has required fields. */
export const isGroupRequired = (group) =>
  (group.occurrences?.min ?? 1) > 0 && (group.fields ?? []).some((field) => field.required);

const fieldCandidates = (field) =>
  [field.program_name, field.label, ...(field.aliases ?? [])].filter(Boolean).map(normalizeHeader);

/** The header a field matches by name, label or alias, if it is still free. */
const findHeader = (headers, candidates, used) =>
  headers.find((header) => !used.has(header) && candidates.includes(normalizeHeader(header))) ?? "";

/**
 * Match file headers to fields: standard fields by name, label or alias;
 * group fields by numbered headers (qualification_1, qualification 2...),
 * the first set also by the plain name. Adds sets while the file has
 * numbered columns for them.
 */
export const autoMatch = (headers, columns) => {
  const { fields, groups } = splitColumns(columns);
  const used = new Set();
  const standard = {};

  fields.forEach((field) => {
    const header = findHeader(headers, fieldCandidates(field), used);
    if (header) used.add(header);
    standard[field.program_name] = { value: header, auto: Boolean(header) };
  });

  const repeatable = {};
  groups.forEach((group) => {
    const { min, max } = groupLimits(group);
    const instances = [];

    for (let number = 1; number <= max; number += 1) {
      const mapping = {};
      let matched = 0;
      (group.fields ?? []).forEach((field) => {
        const numbered = fieldCandidates(field).flatMap((name) => [`${name}${number}`]);
        const candidates = number === 1 ? [...numbered, ...fieldCandidates(field)] : numbered;
        const header = findHeader(headers, candidates, used);
        if (header) {
          used.add(header);
          matched += 1;
        }
        mapping[field.program_name] = { value: header, auto: Boolean(header) };
      });

      if (number > min && matched === 0) break;
      instances.push({ id: newInstanceId(), mapping });
    }

    repeatable[group.program_name] = instances;
  });

  return { standardFields: standard, repeatableGroups: repeatable };
};

export const emptyGroupInstance = (group) => ({
  id: newInstanceId(),
  mapping: Object.fromEntries((group.fields ?? []).map((field) => [field.program_name, { value: "", auto: false }])),
});

export const groupMax = (group) => groupLimits(group).max;
export const groupMin = (group) => groupLimits(group).min;

/**
 * Problems that stop the import, per field or group: a required column not
 * chosen, or a set of columns half filled in.
 */
export const mappingProblems = (mapping, columns) => {
  const { fields, groups } = splitColumns(columns);
  const problems = [];

  fields.forEach((field) => {
    if (field.required && !mapping.standardFields?.[field.program_name]?.value) {
      problems.push({ key: field.program_name, label: field.label, message: `Choose the column for ${field.label}.` });
    }
  });

  groups.forEach((group) => {
    const instances = mapping.repeatableGroups?.[group.program_name] ?? [];
    const required = (group.fields ?? []).filter((field) => field.required);
    const complete = instances.filter((instance) => required.every((field) => instance.mapping?.[field.program_name]?.value));
    const partial = instances.filter(
      (instance) =>
        !complete.includes(instance) &&
        Object.values(instance.mapping ?? {}).some((entry) => entry?.value),
    );

    if (isGroupRequired(group) && complete.length === 0) {
      problems.push({ key: group.program_name, label: group.label, message: `Choose the columns for at least one set of ${group.label}.` });
    }
    if (partial.length > 0) {
      problems.push({ key: group.program_name, label: group.label, message: `Finish or remove the half-filled set of ${group.label}.` });
    }
  });

  return problems;
};

/** The mapping the API expects: { standardFields: {field: header}, repeatableGroups: {group: [{field: header}]} }. */
export const toApiMapping = (mapping) => ({
  standardFields: Object.fromEntries(
    Object.entries(mapping.standardFields ?? {})
      .filter(([, entry]) => entry?.value)
      .map(([field, entry]) => [field, entry.value]),
  ),
  repeatableGroups: Object.fromEntries(
    Object.entries(mapping.repeatableGroups ?? {}).map(([group, instances]) => [
      group,
      (instances ?? [])
        .map((instance) =>
          Object.fromEntries(
            Object.entries(instance.mapping ?? {})
              .filter(([, entry]) => entry?.value)
              .map(([field, entry]) => [field, entry.value]),
          ),
        )
        .filter((instance) => Object.keys(instance).length > 0),
    ]),
  ),
});

/** Every header in use, with the fields using it: { header: ["Email", "Qualification #2"] }. */
export const headerUsage = (mapping, columns) => {
  const { fields, groups } = splitColumns(columns);
  const usage = {};
  const add = (header, label) => {
    if (!header) return;
    (usage[header] ??= []).push(label);
  };

  fields.forEach((field) => add(mapping.standardFields?.[field.program_name]?.value, field.label));
  groups.forEach((group) =>
    (mapping.repeatableGroups?.[group.program_name] ?? []).forEach((instance, index) =>
      (group.fields ?? []).forEach((field) =>
        add(instance.mapping?.[field.program_name]?.value, `${field.label} #${index + 1}`),
      ),
    ),
  );

  return usage;
};

/* ----------------------------------------------------------------- review */

/**
 * The rows as they will be imported, with a status the review step can
 * filter on. Mirrors the API's own checks loosely: a missing required value
 * is an error (the row will be skipped), a missing optional one a warning.
 */
export const reviewRows = (rows, mapping, columns) => {
  const { fields, groups } = splitColumns(columns);

  return rows.map((row, index) => {
    const values = {};
    const errors = [];
    const warnings = [];

    fields.forEach((field) => {
      const header = mapping.standardFields?.[field.program_name]?.value;
      if (!header) return;
      const value = row[header] ?? "";
      values[field.program_name] = value;
      if (isBlank(value)) (field.required ? errors : warnings).push(field.label);
    });

    groups.forEach((group) => {
      const sets = (mapping.repeatableGroups?.[group.program_name] ?? [])
        .map((instance) =>
          (group.fields ?? [])
            .map((field) => row[instance.mapping?.[field.program_name]?.value] ?? "")
            .filter((value) => !isBlank(value))
            .join(" · "),
        )
        .filter(Boolean);
      values[group.program_name] = sets.join(", ");
      if (sets.length === 0 && isGroupRequired(group)) errors.push(group.label);
    });

    const status = errors.length > 0 ? "error" : warnings.length > 0 ? "warning" : "ready";
    // Row 1 of the file is the header, so data starts at row 2.
    return { __row: index + 2, __status: status, __errors: errors, __warnings: warnings, ...values };
  });
};

/** Does every word of the query appear somewhere in the row? */
export const rowMatches = (row, query) => {
  const words = String(query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = [
    String(row.__row),
    ...Object.entries(row)
      .filter(([key]) => !key.startsWith("__"))
      .map(([, value]) => String(value ?? "")),
  ]
    .join(" ")
    .toLowerCase();
  return words.every((word) => text.includes(word));
};
