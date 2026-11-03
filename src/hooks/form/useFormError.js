import { useCallback, useEffect, useRef, useState } from "react";
import { parseServerError } from "../../utils/functions";

/**
 * Inline form error state for drawer and modal forms (replaces toasts).
 *
 * Pair it with <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />
 *  - setClientError(title, messages): client-side validation problems
 *  - handleServerError(error): pass as `onError` to a mutation's mutate() call
 *  - clearFormError(): call when the user edits the form or retries
 */
export const useFormError = (fallbackTitle) => {
  const [formError, setFormError] = useState(null);
  const errorBannerRef = useRef(null);

  useEffect(() => {
    if (formError && errorBannerRef.current) {
      errorBannerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [formError]);

  const clearFormError = useCallback(() => setFormError(null), []);

  const setClientError = useCallback((title, messages = []) => {
    const list = (Array.isArray(messages) ? messages : [messages]).filter(
      Boolean,
    );
    setFormError({ title, messages: list });
  }, []);

  const handleServerError = useCallback(
    (error) => setFormError(parseServerError(error, fallbackTitle)),
    [fallbackTitle],
  );

  return {
    formError,
    errorBannerRef,
    setFormError,
    setClientError,
    handleServerError,
    clearFormError,
  };
};
