/**
 * ------------------------------------------------------------
 * PDF Header Renderer
 * ------------------------------------------------------------
 *
 * Responsible for rendering the document header.
 *
 * This class DOES NOT know anything about:
 * - Tables
 * - Footers
 * - Saving files
 * - Branding
 *
 * Branding support will be added later.
 * ------------------------------------------------------------
 */

class PdfHeader {

    /**
     * Render the document header.
     *
     * @param {jsPDF} pdf
     * @param {Object} options
     */
    static render(pdf, options = {}) {

        const {
            title = "Export Report",
            subtitle = "",
            generatedAt = new Date(),
            margin = 14,
        } = options;

        // ----------------------------------------------------
        // Title
        // ----------------------------------------------------

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);

        pdf.text(title, margin, 18);

        // ----------------------------------------------------
        // Subtitle
        // ----------------------------------------------------

        let currentY = 26;

        if (subtitle) {

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(11);

            pdf.text(subtitle, margin, currentY);

            currentY += 7;
        }

        // ----------------------------------------------------
        // Generated Date
        // ----------------------------------------------------

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        pdf.text(
            `Generated: ${this.formatDate(generatedAt)}`,
            margin,
            currentY
        );

        currentY += 6;

        // ----------------------------------------------------
        // Divider
        // ----------------------------------------------------

        const pageWidth = pdf.internal.pageSize.getWidth();

        pdf.setDrawColor(220);

        pdf.line(
            margin,
            currentY,
            pageWidth - margin,
            currentY
        );

        // ----------------------------------------------------
        // Return next drawing position
        // ----------------------------------------------------

        return currentY + 6;
    }

    /**
     * Format date for display.
     */
    static formatDate(date) {

        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        return date.toLocaleString();
    }

}

export default PdfHeader;