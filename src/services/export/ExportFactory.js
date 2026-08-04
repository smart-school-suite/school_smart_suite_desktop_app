import ExportFormats from "./constants/ExportFormats";

import PdfGenerator from "./generators/pdf";
import ExcelGenerator from "./generators/ExcelGenerator";
import CsvGenerator from "./generators/CsvGenerator";

class ExportFactory {
  static generators = {
    [ExportFormats.PDF]: new PdfGenerator(),

    [ExportFormats.EXCEL]: new ExcelGenerator(),

    [ExportFormats.CSV]: new CsvGenerator(),
  };

  /**
   * Returns the appropriate generator.
   *
   * @param {String} format
   * @returns {BaseGenerator}
   */
  static get(format) {
    const generator = this.generators[format];

    if (!generator) {
      throw new Error(`Unsupported export format: ${format}`);
    }

    return generator;
  }
}

export default ExportFactory;
