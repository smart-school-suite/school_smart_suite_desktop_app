import ExportFormats from "../constants/ExportFormats";

class ValidationService {
    /**
     * Validate the export payload.
     *
     * @param {Object} payload
     */
    static validate(payload) {
        if (!payload) {
            throw new Error("Export payload is required.");
        }

        this.validateFormat(payload.format);
        this.validateFileName(payload.fileName);
        this.validateColumns(payload.columns);
        this.validateRows(payload.rows);
    }

    /**
     * Validate export format.
     */
    static validateFormat(format) {
        if (!format) {
            throw new Error("Export format is required.");
        }

        const supportedFormats = Object.values(ExportFormats);

        if (!supportedFormats.includes(format)) {
            throw new Error(
                `Unsupported export format: ${format}`
            );
        }
    }

    /**
     * Validate file name.
     */
    static validateFileName(fileName) {
        if (!fileName) {
            throw new Error("File name is required.");
        }

        if (typeof fileName !== "string") {
            throw new Error("File name must be a string.");
        }

        if (!fileName.trim()) {
            throw new Error("File name cannot be empty.");
        }
    }

    /**
     * Validate selected columns.
     */
    static validateColumns(columns) {
        if (!Array.isArray(columns)) {
            throw new Error("Columns must be an array.");
        }

        if (!columns.length) {
            throw new Error("Please select at least one column.");
        }

        columns.forEach((column, index) => {

            if (!column.field) {
                throw new Error(
                    `Column at index ${index} is missing the 'field' property.`
                );
            }

            if (!column.header) {
                throw new Error(
                    `Column '${column.field}' is missing the 'header' property.`
                );
            }

        });
    }

    /**
     * Validate export rows.
     */
    static validateRows(rows) {

        if (!Array.isArray(rows)) {
            throw new Error("Rows must be an array.");
        }

        // Empty exports are allowed.
        // The user may intentionally export an empty result.

    }
}

export default ValidationService;