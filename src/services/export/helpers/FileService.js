import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";

class FileService {
  /**
   * Save a generated file to disk.
   *
   * @param {Object} file
   * @param {Uint8Array} file.data
   * @param {String} file.fileName
   * @param {String} file.extension
   * @param {String} file.mimeType
   *
   * @returns {Promise<Object>}
   */
  static async save(file) {
    try {
      const { data, fileName, extension, mimeType } = file;

      const path = await save({
        defaultPath: `${fileName}.${extension}`,
        filters: [
          {
            name: extension.toUpperCase(),
            extensions: [extension],
          },
        ],
      });

      if (!path) {
        return {
          success: false,
          cancelled: true,
        };
      }

      await writeFile(path, data);

      return {
        success: true,
        cancelled: false,
        path,
        mimeType,
      };
    } catch (error) {
      console.log("ERROR TYPE:", typeof error);
      console.log("ERROR:", error);
      console.dir(error);

      throw error;
    }
  }
}

export default FileService;
