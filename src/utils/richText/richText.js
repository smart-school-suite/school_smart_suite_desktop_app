import DOMPurify from "dompurify";

/**
 * Display-side helpers for description fields written with RichTextEditor.
 *
 * The API sanitizes every rich-text field before storing it, so this is only
 * a second layer: whatever reaches the DOM is passed through DOMPurify with
 * the same small allowlist the editor can produce. Older records hold plain
 * text, and these helpers handle both.
 */

const ALLOWED_TAGS = [
  "p", "br", "h1", "h2", "h3", "strong", "b", "em", "i", "u", "s", "strike",
  "code", "pre", "blockquote", "ul", "ol", "li", "a", "img", "span", "hr",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "style"];

const SAFE_STYLE = /^\s*(color\s*:\s*(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\))|text-align\s*:\s*(left|right|center|justify))\s*$/i;

let hooksInstalled = false;
function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.hasAttribute?.("style")) {
      const kept = node
        .getAttribute("style")
        .split(";")
        .filter((decl) => SAFE_STYLE.test(decl))
        .map((decl) => decl.trim())
        .join("; ");
      if (kept) node.setAttribute("style", kept);
      else node.removeAttribute("style");
    }
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer nofollow");
    }
  });
}

const HTML_TAG = /<\/?[a-z][\s\S]*?>/i;

/** True when the value looks like markup rather than legacy plain text. */
export function isHtml(value) {
  return typeof value === "string" && HTML_TAG.test(value);
}

/** Sanitize HTML for rendering with dangerouslySetInnerHTML. */
export function sanitizeHtml(html) {
  if (!html) return "";
  installHooks();
  return DOMPurify.sanitize(String(html), {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:)/i,
  });
}

/**
 * Plain-text version of a description, for previews, tooltips, truncation
 * and table cells. Block elements are separated by spaces so words do not run
 * together.
 */
export function htmlToPlainText(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (!isHtml(text)) return text;
  const doc = new DOMParser().parseFromString(
    sanitizeHtml(text.replace(/<\/(p|h[1-6]|li|blockquote|pre)>|<br\s*\/?>/gi, "$& ")),
    "text/html",
  );
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

/** True when a description has no visible text (e.g. "<p></p>"). */
export function isRichTextEmpty(value) {
  return htmlToPlainText(value).trim() === "" && !/<img\b/i.test(String(value ?? ""));
}
