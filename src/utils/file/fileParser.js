import * as XLSX from "xlsx";

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