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
      console.log("Validation Complete");

      ValidationService.validate(payload);

      console.log("Factory");

      const generator = ExportFactory.get(payload.format);

      console.log("Generator");

      const file = await generator.generate(payload);

      console.log(file);

      console.log("Saving");

      const result = await FileService.save({
        data: file.data,

        fileName: payload.fileName,

        extension: FileExtensions[payload.format],

        mimeType: MimeTypes[payload.format],
      });

      console.log(result);

      return result;
    } catch (error) {
      console.error("EXPORT ERROR");
      console.error(error);

      return {
        success: false,

        cancelled: false,

        error: error?.message || String(error),
      };
    }
  }
}

export default ExportGenerationService;
