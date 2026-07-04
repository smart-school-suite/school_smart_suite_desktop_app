/**
 * ------------------------------------------------------------
 * Base Generator
 * ------------------------------------------------------------
 *
 * All file generators must extend this class.
 *
 * Responsibilities:
 * - Define the generation contract.
 *
 * It does NOT:
 * - Validate payloads
 * - Save files
 * - Know about React
 * - Know about AG Grid
 * ------------------------------------------------------------
 */

class BaseGenerator {

    /**
     * Generate a file.
     *
     * @param {Object} payload
     *
     * @returns {Promise<{
     *      format: String,
     *      extension: String,
     *      mimeType: String,
     *      data: Uint8Array
     * }>}
     */
    async generate(payload) {
        throw new Error(
            `${this.constructor.name} must implement generate().`
        );
    }

}

export default BaseGenerator;