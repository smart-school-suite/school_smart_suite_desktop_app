import React, { useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useHotkey, formatForDisplay } from "@tanstack/react-hotkeys";

/**
 * SearchInput
 * Reusable Bootstrap-based search field with a Lucide icon,
 * optional live "count" label, keyboard shortcut hint (Ctrl/Cmd+K),
 * and an inline clear button.
 *
 * Works both controlled (pass `value` + `onChange`) and
 * uncontrolled (pass `defaultValue` only).
 *
 * Example:
 *   <SearchInput
 *     placeholder="Search icons..."
 *     resultCount={1780}
 *     resultLabel="icons"
 *     value={query}
 *     onChange={setQuery}
 *     onSubmit={(q) => runSearch(q)}
 *     shortcut="Ctrl+K"
 *     size="lg"
 *   />
 */
// Theme variables — override on a parent wrapper (or :root) to reskin the
// component per page/app without touching this file. Defaults below are a
// neutral Bootstrap-friendly light theme.
const STYLES = `
.search-input {
  --search-bg: var(--bs-body-bg, #fff);
  --search-border: var(--bs-border-color, #dee2e6);
  --search-border-focus: var(--bs-primary, #0d6efd);
  --search-text: var(--bs-body-color, #212529);
  --search-placeholder: #6c757d;
  --search-icon: #6c757d;
  --search-radius: 0.5rem;
  --search-shortcut-bg: rgba(0, 0, 0, 0.06);
  --search-shortcut-text: #6c757d;
  --search-clear-hover-bg: rgba(0, 0, 0, 0.06);

  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background-color: var(--search-bg);
  border: 1px solid var(--search-border);
  border-radius: var(--search-radius);
  padding: 0 0.75rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search-input:focus-within {
  border-color: var(--search-border-focus);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--search-border-focus) 25%, transparent);
}

.search-input--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.search-input__icon {
  flex-shrink: 0;
  color: var(--search-icon);
}

.search-input__field {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--search-text);
  font-size: 0.8rem;
}

.search-input__field::placeholder {
  color: var(--search-placeholder);
}

.search-input__shortcut {
  flex-shrink: 0;
  font-family: inherit;
  font-size: 0.75rem;
  color: var(--search-shortcut-text);
  background-color: var(--search-shortcut-bg);
  border-radius: 0.35rem;
  padding: 0.15rem 0.4rem;
  line-height: 1.4;
}

.search-input__clear {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--search-icon);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  padding: 0;
  cursor: pointer;
}

.search-input__clear:hover {
  background-color: var(--search-clear-hover-bg);
}

.search-input--sm {
  height: 34px;
}
.search-input--sm .search-input__field {
  font-size: 0.85rem;
}

.search-input--md {
  height: 38px;
}

.search-input--lg {
  height: 50px;
  padding: 0 1rem;
}
.search-input--lg .search-input__field {
  font-size: 1rem;
}
`;

// Inject the stylesheet once, no matter how many SearchInput instances render.
let stylesInjected = false;
function useInjectStyles() {
  useEffect(() => {
    if (stylesInjected) return;
    const tag = document.createElement("style");
    tag.setAttribute("data-search-input-styles", "true");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    stylesInjected = true;
  }, []);
}

export default function SearchInput({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  onClear,
  placeholder,
  resultCount,
  resultLabel = "results",
  hotkey = "Mod+K", // e.g. "Mod+K", "Ctrl+U", "Ctrl+V" — must be unique per instance
  enableShortcut = true,
  size = "md", // "sm" | "md" | "lg"
  autoFocus = false,
  disabled = false,
  className = "",
  id,
}) {
  useInjectStyles();

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const inputRef = useRef(null);
  const generatedId = useId();
  const inputId = id || `search-input-${generatedId}`;

  const resolvedPlaceholder =
    placeholder || (resultCount != null ? `Search ${resultCount} ${resultLabel}...` : "Search...");

  const handleChange = (e) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  // Global hotkey (Cmd on macOS, Ctrl elsewhere for "Mod") focuses the input from anywhere.
  // Give each rendered instance a distinct `hotkey` prop, or they'll collide.
  useHotkey(
    hotkey,
    () => {
      inputRef.current?.focus();
    },
    {
      enabled: enableShortcut,
      conflictBehavior: "warn", // logs a console warning if two instances reuse the same hotkey
      meta: { name: "Focus search", description: "Focus the search input" },
    }
  );

  // Enter submits, scoped to this input only.
  useHotkey(
    "Enter",
    () => {
      onSubmit?.(currentValue);
    },
    {
      target: inputRef,
      ignoreInputs: false,
      preventDefault: false,
      meta: { name: "Submit search" },
    }
  );

  // Escape clears, scoped to this input only, and only when there's something to clear.
  useHotkey(
    "Escape",
    () => {
      handleClear();
    },
    {
      target: inputRef,
      enabled: Boolean(currentValue),
      meta: { name: "Clear search" },
    }
  );

  return (
    <div
      className={`search-input search-input--${size} ${disabled ? "search-input--disabled" : ""} ${className}`}
    >
      <Search className="search-input__icon" size={size === "lg" ? 20 : 16} aria-hidden="true" />

      <input
        ref={inputRef}
        id={inputId}
        type="text"
        className="search-input__field"
        placeholder={resolvedPlaceholder}
        value={currentValue}
        onChange={handleChange}
        autoFocus={autoFocus}
        disabled={disabled}
        aria-label={resolvedPlaceholder}
      />

      {currentValue ? (
        <button
          type="button"
          className="search-input__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      ) : (
        enableShortcut && hotkey && (
          <kbd className="search-input__shortcut">{formatForDisplay(hotkey)}</kbd>
        )
      )}
    </div>
  );
}