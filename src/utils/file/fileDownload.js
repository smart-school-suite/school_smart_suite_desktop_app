import { isTauri } from "@tauri-apps/api/core";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import toast from "react-hot-toast";

/**
 * Download a file that ships with the application (e.g. files in /public).
 *
 * In the desktop app this opens the native "Save As" dialog and writes the
 * file to the location the user picks. In a plain browser it falls back to a
 * regular anchor download.
 *
 * @param {string} filePath  Path of the bundled asset, e.g. "/import/examples/teacher_example.csv"
 * @param {string} [fileName] Suggested file name for the saved file
 * @returns {Promise<{success: boolean, cancelled: boolean, path?: string}>}
 */
export const downloadFile = async (filePath, fileName) => {
  const assetPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
  const name = fileName || assetPath.split("/").pop();

  if (!isTauri()) {
    const link = document.createElement("a");
    link.href = assetPath;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { success: true, cancelled: false };
  }

  const response = await fetch(assetPath);
  if (!response.ok) {
    throw new Error(`Could not load ${assetPath} (status ${response.status})`);
  }
  const data = new Uint8Array(await response.arrayBuffer());

  const extension = name.includes(".") ? name.split(".").pop() : "";
  const path = await save({
    defaultPath: name,
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
 * Click handler for "Download template" buttons: saves a bundled template
 * through the native dialog and reports the outcome with a toast.
 */
export const handleTemplateDownload = async (filePath, fileName) => {
  try {
    const result = await downloadFile(filePath, fileName);
    if (result.success && result.path) {
      toast.success(`Template saved to ${result.path}`);
    }
  } catch (error) {
    console.error("Template download failed:", error);
    toast.error("Could not download the template. Please try again.");
  }
};
