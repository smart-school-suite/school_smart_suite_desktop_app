/**
 * Cameroon phone numbers as the forms store them: the nine national digits
 * (e.g. 677123456), shown as 677-123-456.
 */
export const PHONE_DIGITS = 9;
const COUNTRY_CODE = "237";

/**
 * The national digits of whatever was typed, pasted or loaded, and how many
 * leading digits were dropped as a country code: non-digits are removed, a
 * leading 00237 / +237 / 237 is removed when the number is longer than a
 * national one, and the result is cut to nine digits.
 */
export function splitPhone(input) {
  const all = String(input ?? "").replace(/\D/g, "");
  let stripped = 0;
  if (all.startsWith(`00${COUNTRY_CODE}`)) {
    stripped = 2 + COUNTRY_CODE.length;
  } else if (all.length > PHONE_DIGITS && all.startsWith(COUNTRY_CODE)) {
    stripped = COUNTRY_CODE.length;
  }
  return { digits: all.slice(stripped, stripped + PHONE_DIGITS), stripped };
}

export const normalizePhone = (input) => splitPhone(input).digits;

/** "677123456" -> "677-123-456"; partial numbers are grouped as far as they go. */
export function formatPhone(digits) {
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)].filter(Boolean).join("-");
}

/** The position in the formatted text just after its `count`-th digit. */
export function caretAfterDigits(formatted, count) {
  if (count <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === count) return i + 1;
  }
  return formatted.length;
}

/** How many digits come before `position` in `text`. */
export const digitsBefore = (text, position) => text.slice(0, position).replace(/\D/g, "").length;
