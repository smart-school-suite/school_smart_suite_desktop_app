/**
 * ------------------------------------------------------------
 * PDF Footer Renderer
 * ------------------------------------------------------------
 *
 * Responsible for rendering the footer on every page.
 *
 * Responsibilities:
 * - Page numbers
 * - Footer text
 * - Footer divider
 *
 * Branding (logos, signatures, etc.) will be added later.
 * ------------------------------------------------------------
 */

class PdfFooter {

    /**
     * Render the footer.
     *
     * @param {jsPDF} pdf
     * @param {Object} options
     */
    static render(pdf, options = {}) {

        const {
            footerText = "",
            margin = 14,
        } = options;

        const totalPages = pdf.getNumberOfPages();

        for (let page = 1; page <= totalPages; page++) {

            pdf.setPage(page);

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // ---------------------------------------------
            // Divider Line
            // ---------------------------------------------

            pdf.setDrawColor(220);

            pdf.line(
                margin,
                pageHeight - 15,
                pageWidth - margin,
                pageHeight - 15
            );

            // ---------------------------------------------
            // Footer Text
            // ---------------------------------------------

            if (footerText) {

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(9);

                pdf.text(
                    footerText,
                    margin,
                    pageHeight - 8
                );

            }

            // ---------------------------------------------
            // Page Number
            // ---------------------------------------------

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);

            const pageLabel = `Page ${page} of ${totalPages}`;

            const textWidth = pdf.getTextWidth(pageLabel);

            pdf.text(
                pageLabel,
                pageWidth - margin - textWidth,
                pageHeight - 8
            );

        }

    }

}

export default PdfFooter;