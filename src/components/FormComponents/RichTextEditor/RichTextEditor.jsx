import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import EditorToolbar from "./EditorToolBar";
import "../../../styles/richText.css";

/**
 * RichTextEditor
 *
 * A reusable, validated rich-text field built on Tiptap. The validation
 * lifecycle (touched/error state, useImperativeHandle.triggerValidation,
 * prop <-> internal value sync, feedback rendering) mirrors TextAreaInput
 * exactly, so it drops into the same forms with the same contract:
 *
 *   <RichTextEditor
 *     ref={descriptionRef}
 *     value={description}
 *     onChange={setDescription}
 *     onValidationChange={setDescriptionValid}
 *     validationSchema={yup.string().required("Description is required")}
 *     placeholder="Product description"
 *   />
 *
 * One difference from TextAreaInput is unavoidable: the field's value is
 * HTML ("<p></p>" for a technically-empty editor), so "is this empty" is
 * decided from editor.getText() rather than a plain string check — otherwise
 * an untouched editor would read as non-empty and fail an `optional` skip.
 */
export const RichTextEditor = forwardRef(
  (
    {
      onChange,
      onValidationChange,
      value,
      placeholder,
      validationSchema,
      optional = false,
      minHeight = 160,
    },
    ref,
  ) => {
    const [inputError, setInputError] = useState("");
    const [isInputTouched, setIsInputTouched] = useState(false);
    const darkMode = useSelector((state) => state.theme.darkMode);

    // Holds the latest HTML so validateInput/useImperativeHandle always see
    // the current value without needing the editor instance re-created.
    const currentHtmlRef = useRef(value || "");

    // 🔹 Validate input (same shape as TextAreaInput's validateInput)
    const validateInput = useCallback(
      async (html, plainText) => {
        const isEmpty = plainText.trim() === "";

        if (optional && isEmpty) {
          setInputError("");
          onValidationChange?.(true);
          return true;
        }

        if (!validationSchema) {
          setInputError("");
          onValidationChange?.(true);
          return true;
        }

        try {
          // Validated against plain text so required/min/max length rules
          // behave as the author expects, not against raw HTML markup.
          await validationSchema.validate(isEmpty ? "" : plainText);
          setInputError("");
          onValidationChange?.(true);
          return true;
        } catch (err) {
          setInputError(err.message || "Invalid input");
          onValidationChange?.(false);
          return false;
        }
      },
      [validationSchema, onValidationChange, optional],
    );

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Color,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Link.configure({ openOnClick: false, autolink: true }),
        ImageExtension,
        Placeholder.configure({ placeholder: placeholder || "" }),
      ],
      content: value || "",
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        currentHtmlRef.current = html;
        onChange?.(html);
        if (isInputTouched) {
          validateInput(html, editor.getText());
        }
      },
      onFocus: () => {
        setIsInputTouched(true);
        if (!editor?.isEmpty) {
          validateInput(currentHtmlRef.current, editor.getText());
        }
      },
      onBlur: ({ editor }) => {
        validateInput(currentHtmlRef.current, editor.getText());
      },
    });

    // 🔹 Sync external value changes into the editor (e.g. form reset, edit-mode prefill)
    useEffect(() => {
      if (!editor) return;
      const incoming = value || "";
      if (incoming !== currentHtmlRef.current) {
        editor.commands.setContent(incoming, false);
        currentHtmlRef.current = incoming;
        if (incoming && !isInputTouched) {
          setIsInputTouched(true);
          validateInput(incoming, editor.getText());
        } else if (!incoming && optional) {
          setIsInputTouched(false);
          setInputError("");
          onValidationChange?.(true);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, editor, optional, validateInput]);

    // 🔹 Expose imperative validation trigger — same contract as TextAreaInput
    useImperativeHandle(
      ref,
      () => ({
        triggerValidation: async () => {
          if (!editor) return true;
          if (editor.isEmpty && !optional) {
            setIsInputTouched(true);
          }
          return validateInput(currentHtmlRef.current, editor.getText());
        },
      }),
      [editor, optional, validateInput],
    );

    // 🔹 Feedback helpers — identical logic/classes to TextAreaInput
    const hasContent = editor && !editor.isEmpty;
    const feedbackContent =
      isInputTouched && inputError
        ? inputError
        : isInputTouched && !inputError && hasContent
          ? "Looks Good!"
          : "";

    const feedbackClasses = [
      "transition-all font-size-sm",
      isInputTouched && inputError
        ? "invalid-feedback"
        : isInputTouched && !inputError && hasContent
          ? "valid-feedback"
          : "",
      isInputTouched && (inputError || (!inputError && hasContent))
        ? "opacity-100"
        : "opacity-0",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="text-input-container">
        <div
          className={`rte-container ${darkMode ? "dark-mode-rte" : ""} ${
            isInputTouched && inputError ? "is-invalid" : ""
          } ${isInputTouched && !inputError && hasContent ? "is-valid" : ""}`}
        >
          <EditorToolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="rte-content"
            style={{ minHeight }}
          />
        </div>
        <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";