import { useState, useRef, useEffect } from "react";
import {
  Undo2,
  Redo2,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Quote,
} from "lucide-react";

const HEADING_OPTIONS = [
  { label: "Normal Text", level: 0 },
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
];

const ALIGN_OPTIONS = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
  { value: "justify", icon: AlignJustify },
];

const COLOR_SWATCHES = ["#000000", "#083049", "#D14343", "#1D9A6C", "#0EA7E9", "#B87508", "#6b7280"];

/**
 * Closes a dropdown when the user clicks anywhere outside it — every dropdown
 * in this toolbar (heading, align, color) shares this instead of each
 * reimplementing its own outside-click listener.
 */
function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onOutside]);
  return ref;
}

function ToolbarButton({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep editor selection/focus intact
      onClick={onClick}
      className={`rte-btn${active ? " rte-btn-active" : ""}`}
    >
      {children}
    </button>
  );
}

function HeadingDropdown({ editor }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const current =
    HEADING_OPTIONS.find((o) => (o.level === 0 ? editor.isActive("paragraph") : editor.isActive("heading", { level: o.level }))) ||
    HEADING_OPTIONS[0];

  const select = (option) => {
    if (option.level === 0) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: option.level }).run();
    setOpen(false);
  };

  return (
    <div className="rte-dropdown" ref={ref}>
      <button type="button" className="rte-select" onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen((o) => !o)}>
        {current.label}
        <ChevronDown size={13} />
      </button>
      {open && (
        <div className="rte-menu">
          {HEADING_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.label}
              className={`rte-menu-item${current.label === option.label ? " rte-menu-item-active" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AlignDropdown({ editor }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const current = ALIGN_OPTIONS.find((o) => editor.isActive({ textAlign: o.value })) || ALIGN_OPTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <div className="rte-dropdown" ref={ref}>
      <ToolbarButton title="Alignment" onClick={() => setOpen((o) => !o)}>
        <CurrentIcon size={16} />
        <ChevronDown size={11} style={{ marginLeft: 2 }} />
      </ToolbarButton>
      {open && (
        <div className="rte-menu rte-menu-row">
          {ALIGN_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                type="button"
                key={option.value}
                className={`rte-menu-icon-item${editor.isActive({ textAlign: option.value }) ? " rte-menu-item-active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  editor.chain().focus().setTextAlign(option.value).run();
                  setOpen(false);
                }}
              >
                <Icon size={15} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ColorDropdown({ editor }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const current = editor.getAttributes("textStyle").color || "#000000";

  return (
    <div className="rte-dropdown" ref={ref}>
      <ToolbarButton title="Text color" onClick={() => setOpen((o) => !o)}>
        <span className="rte-color-swatch" style={{ background: current }} />
        <ChevronDown size={11} style={{ marginLeft: 2 }} />
      </ToolbarButton>
      {open && (
        <div className="rte-menu rte-menu-row">
          {COLOR_SWATCHES.map((c) => (
            <button
              type="button"
              key={c}
              title={c}
              className="rte-swatch-btn"
              style={{ background: c }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().setColor(c).run();
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("URL", previous || "https://");
    if (url === null) return; // cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const setImage = () => {
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="rte-toolbar">
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo2 size={16} />
      </ToolbarButton>

      <span className="rte-sep" />

      <HeadingDropdown editor={editor} />
      <AlignDropdown editor={editor} />
      <ColorDropdown editor={editor} />

      <span className="rte-sep" />

      <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon size={15} />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code size={15} />
      </ToolbarButton>

      <span className="rte-sep" />

      <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
        <Link2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Image" onClick={setImage}>
        <ImageIcon size={15} />
      </ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={15} />
      </ToolbarButton>
    </div>
  );
}