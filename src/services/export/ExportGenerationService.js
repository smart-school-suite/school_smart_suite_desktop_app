import ExportFactory from "./ExportFactory";

import ValidationService from "./helpers/ValidationService";
import FileService from "./helpers/FileService";

import MimeTypes from "./constants/MimeTypes";
import FileExtensions from "./constants/FileExtensions";

class ExportGenerationService {
  /**
   * Generate and save a file.
   *
   * @param {Object} payload
   *
   * @returns {Promise<Object>}
   */
  static async generate(payload) {
    try {

      ValidationService.validate(payload);

      const generator = ExportFactory.get(payload.format);

      const file = await generator.generate(payload);

      const result = await FileService.save({
        data: file.data,

        fileName: payload.fileName,

        extension: FileExtensions[payload.format],

        mimeType: MimeTypes[payload.format],
      });


      return result;
    } catch (error) {
      return {
        success: false,

        cancelled: false,

        error: error?.message || String(error),
      };
    }
  }
}

export default ExportGenerationService;
