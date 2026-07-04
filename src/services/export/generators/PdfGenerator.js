import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import BaseGenerator from "./BaseGenerator";
import ExportFormats from "../constants/ExportFormats";
import MimeTypes from "../constants/MimeTypes";
import FileExtensions from "../constants/FileExtensions";

class PdfGenerator extends BaseGenerator {
    /**
     * Generate a PDF document.
     *
     * Payload:
     * {
     *    fileName: "Teachers",
     *    title: "Teachers Report", // optional
     *    columns: [
     *      {
     *          field: "name",
     *          header: "Teacher Name"
     *      }
     *    ],
     *    rows: [
     *      {
     *          name: "John Doe"
     *      }
     *    ]
     * }
     */
    async generate(payload) {
        const {
            title = "Export",
            columns = [],
            rows = [],
        } = payload;

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        // --------------------------------------------------
        // Title
        // --------------------------------------------------

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text(title, 14, 18);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        pdf.text(
            `Generated: ${new Date().toLocaleString()}`,
            14,
            25
        );

        // --------------------------------------------------
        // Table
        // --------------------------------------------------

        const headers = columns.map(column => column.header);

        const body = rows.map(row =>
            columns.map(column => {
                const value = row[column.field];

                if (value === null || value === undefined) {
                    return "";
                }

                if (typeof value === "boolean") {
                    return value ? "Yes" : "No";
                }

                return String(value);
            })
        );

        autoTable(pdf, {
            startY: 32,

            head: [headers],

            body,

            theme: "grid",

            headStyles: {
                fillColor: [14, 167, 233],
                textColor: 255,
                fontStyle: "bold",
            },

            styles: {
                fontSize: 9,
                cellPadding: 2,
                overflow: "linebreak",
            },

            alternateRowStyles: {
                fillColor: [248, 250, 252],
            },

            margin: {
                left: 14,
                right: 14,
            },

            didDrawPage: data => {
                const pageCount = pdf.getNumberOfPages();

                pdf.setFontSize(9);

                pdf.text(
                    `Page ${data.pageNumber} of ${pageCount}`,
                    pdf.internal.pageSize.width - 40,
                    pdf.internal.pageSize.height - 8
                );
            },
        });

        // --------------------------------------------------
        // Return bytes
        // --------------------------------------------------

        const arrayBuffer = pdf.output("arraybuffer");

        return {
            format: ExportFormats.PDF,
            extension: FileExtensions[ExportFormats.PDF],
            mimeType: MimeTypes[ExportFormats.PDF],
            data: new Uint8Array(arrayBuffer),
        };
    }
}

export default PdfGenerator;