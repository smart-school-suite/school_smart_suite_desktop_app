import autoTable from "jspdf-autotable";

/**
 * ------------------------------------------------------------
 * PDF Table Renderer
 * ------------------------------------------------------------
 *
 * Responsible only for rendering table data.
 *
 * It expects normalized columns and rows.
 *
 * columns:
 * [
 *   {
 *      field: "name",
 *      header: "Teacher Name"
 *   }
 * ]
 *
 * rows:
 * [
 *   {
 *      name: "John Doe"
 *   }
 * ]
 * ------------------------------------------------------------
 */

class PdfTable {

    /**
     * Render the export table.
     *
     * @param {jsPDF} pdf
     * @param {Object} options
     *
     * @returns {Number} final Y position
     */
    static render(pdf, options = {}) {

        const {
            columns = [],
            rows = [],
            startY = 20,
            margin = 14,
        } = options;

        const headers = this.buildHeaders(columns);

        const body = this.buildRows(columns, rows);

        autoTable(pdf, {

            startY,

            head: [headers],

            body,

            theme: "grid",

            margin: {
                left: margin,
                right: margin,
            },

            headStyles: {

                fillColor: [14, 167, 233],

                textColor: 255,

                fontStyle: "bold",

                fontSize: 10,

                halign: "center",

                valign: "middle",

            },

            bodyStyles: {

                fontSize: 9,

                textColor: 40,

                cellPadding: 2.5,

                overflow: "linebreak",

                valign: "middle",

            },

            alternateRowStyles: {

                fillColor: [248, 250, 252],

            },

            styles: {

                lineColor: [225, 225, 225],

                lineWidth: 0.1,

            },

            tableLineWidth: 0.2,

            tableLineColor: [220, 220, 220],

        });

        return pdf.lastAutoTable.finalY;

    }

    /**
     * Convert column definitions into table headers.
     */
    static buildHeaders(columns) {

        return columns.map(column => column.header);

    }

    /**
     * Convert rows into AutoTable format.
     */
    static buildRows(columns, rows) {

        return rows.map(row => {

            return columns.map(column => {

                const value = row[column.field];

                return this.formatValue(value);

            });

        });

    }

    /**
     * Formats values before rendering.
     */
    static formatValue(value) {

        if (value === undefined || value === null) {
            return "";
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        if (Array.isArray(value)) {
            return value.join(", ");
        }

        if (typeof value === "object") {
            return JSON.stringify(value);
        }

        return String(value);

    }

}

export default PdfTable;