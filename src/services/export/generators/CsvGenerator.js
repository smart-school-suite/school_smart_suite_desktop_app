import BaseGenerator from "./BaseGenerator";
import ExportFormats from "../constants/ExportFormats";
import MimeTypes from "../constants/MimeTypes";
import FileExtensions from "../constants/FileExtensions";

class CsvGenerator extends BaseGenerator {
    async generate(payload) {
        const {
            columns = [],
            rows = [],
        } = payload;

        const headerRow = columns.map(column => this.escapeCsvValue(column.header));
        const csvRows = [headerRow.join(",")];

        for (const row of rows) {
            const values = columns.map(column => {
                const value = row[column.field];

                if (value === null || value === undefined) {
                    return "";
                }

                if (typeof value === "boolean") {
                    return value ? "Yes" : "No";
                }

                return this.escapeCsvValue(String(value));
            });

            csvRows.push(values.join(","));
        }

        const csvString = csvRows.join("\n");
        const encoder = new TextEncoder();
        const data = encoder.encode(csvString);

        return {
            format: ExportFormats.CSV,
            extension: FileExtensions[ExportFormats.CSV],
            mimeType: MimeTypes[ExportFormats.CSV],
            data: data,
        };
    }

    escapeCsvValue(value) {
        if (value.includes(",") || value.includes('"') || value.includes("\n") || value.includes("\r")) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }
}

export default CsvGenerator;