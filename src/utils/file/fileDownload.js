import { isTauri } from "@tauri-apps/api/core";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import toast from "react-hot-toast";
import { buildImportTemplateCsv } from "./importTemplate";

/**
 * Save raw bytes to disk. In the desktop app this opens the native "Save As"
 * dialog and writes the file where the user picks; in a plain browser it
 * falls back to a regular anchor download.
 *
 * @param {Uint8Array} data
 * @param {string} fileName Suggested file name for the saved file
 * @param {string} [mimeType]
 * @returns {Promise<{success: boolean, cancelled: boolean, path?: string}>}
 */
export const saveFile = async (data, fileName, mimeType = "") => {
  if (!isTauri()) {
    const url = URL.createObjectURL(new Blob([data], { type: mimeType }));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return { success: true, cancelled: false };
  }

  const extension = fileName.includes(".") ? fileName.split(".").pop() : "";
  const path = await save({
    defaultPath: fileName,
    filters: extension
      ? [{ name: extension.toUpperCase(), extensions: [extension] }]
      : undefined,
  });

  if (!path) {
    return { success: false, cancelled: true };
  }

  await writeFile(path, data);
  return { success: true, cancelled: false, path };
};

/**
 * Download a file that ships with the application (e.g. files in /public).
 *
 * @param {string} filePath  Path of the bundled asset, e.g. "/import/examples/teacher_example.csv"
 * @param {string} [fileName] Suggested file name for the saved file
 */
export const downloadFile = async (filePath, fileName) => {
  const assetPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
  const name = fileName || assetPath.split("/").pop();

  const response = await fetch(assetPath);
  if (!response.ok) {
    throw new Error(`Could not load ${assetPath} (status ${response.status})`);
  }
  const data = new Uint8Array(await response.arrayBuffer());
  return saveFile(data, name, response.headers.get("content-type") || "");
};

/**
 * Click handler for "Download template" buttons with a bundled template file.
 */
export const handleTemplateDownload = async (filePath, fileName) => {
  return reportTemplateSave(() => downloadFile(filePath, fileName));
};

/**
 * Click handler for modules without a bundled template: builds a CSV whose
 * headers match the module's import columns and saves it.
 */
export const handleGeneratedTemplateDownload = async (columns, fileName) => {
  return reportTemplateSave(() =>
    saveFile(
      new TextEncoder().encode(buildImportTemplateCsv(columns)),
      fileName,
      "text/csv",
    ),
  );
};

const reportTemplateSave = async (saveAction) => {
  try {
    const result = await saveAction();
    if (result.success && result.path) {
      toast.success(`Template saved to ${result.path}`);
    }
  } catch (error) {
    console.error("Template download failed:", error);
    toast.error("Could not download the template. Please try again.");
  }
};
