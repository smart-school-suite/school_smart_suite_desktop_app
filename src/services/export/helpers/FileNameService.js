class FilenameService {
    /**
     * Removes invalid filename characters.
     */
    static sanitize(name = "") {
        return String(name)
            .trim()
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
            .replace(/\s+/g, "_");
    }

    /**
     * Generates a filename.
     *
     * Example:
     * teachers_2026-07-03
     */
    static generate(name = "export") {
        const date = new Date().toISOString().split("T")[0];

        return `${this.sanitize(name)}_${date}`;
    }

    /**
     * Ensures the filename has an extension.
     */
    static withExtension(name, extension) {
        if (name.endsWith(`.${extension}`)) {
            return name;
        }

        return `${name}.${extension}`;
    }
}

export default FilenameService;