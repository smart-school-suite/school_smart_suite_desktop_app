import * as XLSX from "xlsx";
import Papa from "papaparse";

export function formatImportMapping(mapping) {
  const formatted = {
    standardFields: {},
    repeatableGroups: {},
  };

  // Standard fields
  Object.entries(mapping?.standardFields ?? {}).forEach(
    ([field, config]) => {
      if (!config?.value) {
        return;
      }

      formatted.standardFields[field] = config.value;
    }
  );

  // Repeatable groups
  Object.entries(mapping?.repeatableGroups ?? {}).forEach(
    ([groupName, group]) => {
      formatted.repeatableGroups[groupName] = (
        group?.instances ?? []
      )
        .map((instance) => {
          const formattedInstance = {};

          Object.entries(instance?.mapping ?? {}).forEach(
            ([field, config]) => {
              if (!config?.value) {
                return;
              }

              formattedInstance[field] = config.value;
            }
          );

          return formattedInstance;
        })
        .filter(
          (instance) => Object.keys(instance).length > 0
        );
    }
  );

  return formatted;
}

export const transformImportPreviewData = ({
  spreadsheetData,
  mapping,
  schema = {},
}) => {
  if (!Array.isArray(spreadsheetData) || spreadsheetData.length === 0) {
    return [];
  }

  if (!mapping || typeof mapping !== 'object') {
    return spreadsheetData;
  }

  const isAdvancedMapping = mapping.standardFields || mapping.repeatableGroups;
  
  if (!isAdvancedMapping) {
    return spreadsheetData;
  }

  const { standardFields = {}, repeatableGroups = {} } = mapping;

  const isMeaningfulValue = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    return true;
  };

  const hasMeaningfulValues = (obj) => {
    if (!obj || typeof obj !== 'object') return false;
    return Object.values(obj).some(value => isMeaningfulValue(value));
  };

  const getSpreadsheetValue = (row, columnName) => {
    if (!columnName || typeof columnName !== 'string') return '';
    return row[columnName] !== undefined && row[columnName] !== null
      ? row[columnName]
      : '';
  };

  const transformRow = (row) => {
    const result = {};

    Object.entries(standardFields).forEach(([logicalField, fieldConfig]) => {
      const columnName = fieldConfig?.value;
      
      if (columnName && typeof columnName === 'string' && columnName.trim() !== '') {
        const value = getSpreadsheetValue(row, columnName);
        result[logicalField] = value;
      }
    });

    Object.entries(repeatableGroups).forEach(([groupName, groupConfig]) => {
      const instances = groupConfig?.instances;
      
      if (!Array.isArray(instances) || instances.length === 0) {
        return;
      }

      const groupResults = [];

      instances.forEach((instance) => {
        const instanceMapping = instance?.mapping || {};
        const instanceResult = {};

        Object.entries(instanceMapping).forEach(([logicalField, fieldConfig]) => {
          const columnName = fieldConfig?.value;
          
          if (columnName && typeof columnName === 'string' && columnName.trim() !== '') {
            const value = getSpreadsheetValue(row, columnName);
            instanceResult[logicalField] = value;
          }
        });

        if (hasMeaningfulValues(instanceResult)) {
          groupResults.push(instanceResult);
        }
      });

      if (groupResults.length > 0) {
        result[groupName] = groupResults;
      }
    });

    return result;
  };

  return spreadsheetData.map(row => transformRow(row));
};

/**
 * Enhanced read function that applies advanced mapping
 */
export const readAndTransformSpreadsheetData = async (file, mapping = {}) => {
  try {
    // First, read the raw spreadsheet data using the existing function
    const rawData = await readSpreadsheetData(file);
    
    // Then apply the advanced transformation
    return transformImportPreviewData({
      spreadsheetData: rawData,
      mapping: mapping,
    });
  } catch (error) {
    throw new Error(`Failed to read and transform spreadsheet: ${error.message}`);
  }
};

export const readSpreadsheetData = (file, mapping = {}) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();
    const applyMapping = (rows, mapping) => {
      const entries = Object.entries(mapping || {});

      if (entries.length === 0) return rows;

      return rows.map((row) => {
        const mapped = {};
        entries.forEach(([targetField, sourceColumn]) => {
          if (!sourceColumn) {
            mapped[targetField] = "";
            return;
          }
          mapped[targetField] =
            row[sourceColumn] !== undefined && row[sourceColumn] !== null
              ? row[sourceColumn]
              : "";
        });
        return mapped;
      });
    };

    const parseCsvToObjects = (text) => {
      if (!text || !text.trim()) return [];

      const { data, errors } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => (typeof value === "string" ? value.trim() : value),
      });

      if (errors.length > 0) {
        const fatal = errors.filter((e) => e.type !== "FieldMismatch");
        if (fatal.length > 0) {
          throw new Error(`Failed to parse CSV file: ${fatal[0].message}`);
        }
      }

      return data;
    };

    const parseExcelToObjects = (data) => {
      try {
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const nonBlankRows = rows.filter((row) =>
          row.some((cell) => cell !== null && cell !== undefined && cell !== "")
        );

        if (nonBlankRows.length === 0) return [];

        const headers = nonBlankRows[0].map((h) => String(h).trim());
        const result = [];
        for (let i = 1; i < nonBlankRows.length; i++) {
          const row = nonBlankRows[i];
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] =
              row[index] !== undefined && row[index] !== null
                ? String(row[index]).trim()
                : "";
          });
          result.push(obj);
        }

        return result;
      } catch (error) {
        throw new Error(`Failed to parse Excel file: ${error.message}`);
      }
    };

    if (ext === "csv") {
      reader.onload = (e) => {
        try {
          const text = e.target.result || "";
          const rows = parseCsvToObjects(text);
          resolve(applyMapping(rows, mapping));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read CSV file"));
      reader.readAsText(file);
    } else if (ext === "xlsx" || ext === "xls") {
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const rows = parseExcelToObjects(data);
          resolve(applyMapping(rows, mapping));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read Excel file"));
      reader.readAsArrayBuffer(file);
    } else {
      reject(
        new Error("Unsupported file format. Please use CSV, XLSX, or XLS files.")
      );
    }
  });
};

const countCsvRows = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;
        if (!text || !text.trim()) return resolve(0);

        const normalized = text.replace(/\r\n|\r/g, "\n");

        const lines = normalized.match(/(?:[^\n"]|"(?:""|[^"])*")+/g) || [];
        const nonBlank = lines.filter((line) => line.trim().length > 0);

        resolve(Math.max(0, nonBlank.length - 1));
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
};

const countExcelRows = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const nonBlank = rows.filter((r) =>
          r.some((cell) => cell !== null && cell !== ""),
        );

        resolve(Math.max(0, nonBlank.length - 1));
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};

export const countSpreadsheetRows = async (file) => {
  if (!file) return 0;

  const ext = file.name.split(".").pop().toLowerCase();

  if (ext === "csv") {
    return await countCsvRows(file);
  }

  if (ext === "xlsx" || ext === "xls") {
    return await countExcelRows(file);
  }

  throw new Error("Unsupported file type");
};

export const normalizeKey = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export const getSpreadsheetHeaders = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve([]);
    const ext = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    if (ext === "csv") {
      reader.onload = (e) => {
        try {
          const text = e.target.result || "";
          const firstLine = text.replace(/\r\n|\r/g, "\n").split("\n")[0];
          const headers = firstLine.match(/(?:[^\s,"]|"(?:""|[^"])*")+/g) || [];
          const cleanHeaders = headers.map((h) =>
            h.replace(/^"|"$/g, "").trim(),
          );
          resolve(cleanHeaders);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    } else if (ext === "xlsx" || ext === "xls") {
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          const headers = (rows[0] || []).map((h) => String(h).trim());
          resolve(headers);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("Unsupported file format"));
    }
  });
};


export const autoMatchColumns = (fileHeaders = [], targetFields = []) => {
  const initialMapping = {};
  const usedFileHeaders = new Set();

  targetFields.forEach((field) => {
    const targetNorm = normalizeKey(field.program_name);
    const targetLabelNorm = normalizeKey(field.label);

    const matchedHeader = fileHeaders.find((header) => {
      if (usedFileHeaders.has(header)) return false;
      const headerNorm = normalizeKey(header);

      if (headerNorm === targetNorm || headerNorm === targetLabelNorm) return true;

      if (field.aliases && Array.isArray(field.aliases)) {
        return field.aliases.some((alias) => normalizeKey(alias) === headerNorm);
      }

      return false;
    });

    if (matchedHeader) {
      initialMapping[field.program_name] = matchedHeader;
      usedFileHeaders.add(matchedHeader);
    } else {
      initialMapping[field.program_name] = ""; // Unmapped
    }
  });

  return initialMapping;
};

export function categorizeImportData(columns, data) {
  const result = {
    ready: [],
    warnings: [],
    errors: []
  };

  const requiredFields = columns.filter(col => col.required).map(col => col.program_name);
  const optionalFields = columns.filter(col => !col.required).map(col => col.program_name);

  const isEmpty = (value) => {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
  };

  data.forEach((row, index) => {
    const rowIssues = {
      errors: [],
      warnings: []
    };

    for (const field of requiredFields) {
      if (isEmpty(row[field])) {
        rowIssues.errors.push(`Missing required field: '${field}'`);
      }
    }

    for (const field of optionalFields) {
      if (isEmpty(row[field])) {
        rowIssues.warnings.push(`Missing optional field: '${field}'`);
      }
    }

    const processedRow = {
      ...row,
      _meta: {
        rowIndex: index,
        errors: rowIssues.errors,
        warnings: rowIssues.warnings
      }
    };

    if (rowIssues.errors.length > 0) {
      result.errors.push(processedRow);
    } else if (rowIssues.warnings.length > 0) {
      result.warnings.push(processedRow);
    } else {
      result.ready.push(processedRow);
    }
  });

  return result;
}