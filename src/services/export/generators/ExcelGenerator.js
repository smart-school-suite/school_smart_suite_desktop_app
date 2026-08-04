import * as XLSX from "xlsx";
import BaseGenerator from "./BaseGenerator";
import ExportFormats from "../constants/ExportFormats";
import MimeTypes from "../constants/MimeTypes";
import FileExtensions from "../constants/FileExtensions";

class ExcelGenerator extends BaseGenerator {
    async generate(payload) {
        const {
            title = "Export",
            columns = [],
            rows = [],
        } = payload;

        const headers = columns.map(column => column.header);

        const data = rows.map(row =>
            columns.map(column => {
                const value = row[column.field];

                if (value === null || value === undefined) {
                    return "";
                }

                if (typeof value === "boolean") {
                    return value ? "Yes" : "No";
                }

                return value;
            })
        );

        const worksheetData = [headers, ...data];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        const columnWidths = columns.map((column, index) => {
            const maxHeaderLength = column.header.length;
            const maxDataLength = rows.reduce((max, row) => {
                const value = row[column.field];
                if (value === null || value === undefined) return max;
                const strValue = String(value);
                return Math.max(max, strValue.length);
            }, 0);
            const width = Math.max(maxHeaderLength, maxDataLength, 10);
            return { wch: Math.min(width + 2, 50) };
        });

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, title.substring(0, 31));

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        return {
            format: ExportFormats.EXCEL,
            extension: FileExtensions[ExportFormats.EXCEL],
            mimeType: MimeTypes[ExportFormats.EXCEL],
            data: new Uint8Array(excelBuffer),
        };
    }
}

export default ExcelGenerator;