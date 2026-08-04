export const downloadFile = (filePath, fileName) => {
  try {
    // Create link directly to the file in public folde
    const link = document.createElement("a");
    link.href = filePath; // e.g., "/downloads/sample.pdf"
    link.download = fileName || filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
  }
};