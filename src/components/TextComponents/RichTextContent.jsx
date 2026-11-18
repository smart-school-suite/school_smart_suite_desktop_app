import { useMemo } from "react";
import { useSelector } from "react-redux";
import { isHtml, sanitizeHtml } from "../../utils/richText/richText";

/**
 * Renders a description saved by RichTextEditor. HTML is sanitized before it
 * is inserted; legacy plain-text values are rendered as text with their line
 * breaks kept.
 */
function RichTextContent({ content, className = "", fallback = null, as: Tag = "div" }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const html = useMemo(() => (isHtml(content) ? sanitizeHtml(content) : null), [content]);

  if (content === null || content === undefined || content === "") return fallback;

  const classes = `rte-rendered ${darkMode ? "dark-mode-rte-rendered" : ""} ${className}`.trim();

  if (html === null) {
    return (
      <Tag className={classes} style={{ whiteSpace: "pre-line" }}>
        {content}
      </Tag>
    );
  }

  return <Tag className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default RichTextContent;
