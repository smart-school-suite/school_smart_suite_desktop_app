import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "../common/useDebounce";
import {
  filterCourses,
  isEnteredScore,
  scoreErrors,
  toList,
} from "../../utils/evaluation/scoreEntry";

/**
 * Entry logic shared by the CA, exam and resit score dialogs.
 *
 * - errors: { [course.key]: message } for every score that can't be saved;
 *   errorFor(course) only shows one after the field was edited or a save
 *   was attempted, so an untouched form isn't covered in red.
 * - visible: the courses matching the (debounced) search.
 * - entered / completion: courses with a score that can be saved.
 * - attemptSave(): shows every error; returns true when all scores are valid.
 *
 * Loading: `helperQuery` is the helper data query. The dialog waits for the request
 * made when it opened (never a cached copy, which may be out of date), then
 * calls initialise(data) to fill the slice; `reset` runs when the dialog
 * closes, whichever way it closes.
 */
export const useScoreEntry = ({ helperQuery, initialise, reset, scores, maxScore }) => {
  const list = toList(scores);
  const data = helperQuery?.data?.data;
  const fresh = Boolean(helperQuery?.isFetchedAfterMount) && !helperQuery?.error;
  const [initialisedWith, setInitialisedWith] = useState(null);

  const initialiseRef = useRef(initialise);
  initialiseRef.current = initialise;
  const resetRef = useRef(reset);
  resetRef.current = reset;

  useEffect(() => {
    if (!fresh || !data) return;
    initialiseRef.current?.(data);
    setInitialisedWith(data);
  }, [fresh, data]);

  useEffect(() => () => resetRef.current?.(), []);

  const isLoading =
    Boolean(helperQuery?.isLoading) ||
    (!helperQuery?.error && !helperQuery?.isFetchedAfterMount) ||
    (fresh && Boolean(data) && initialisedWith !== data);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [touched, setTouched] = useState(() => new Set());
  const [showAll, setShowAll] = useState(false);

  const errors = useMemo(
    () => scoreErrors(list, maxScore, (course) => course?.key),
    [list, maxScore],
  );
  const errorCount = Object.keys(errors).length;
  const visible = useMemo(() => filterCourses(list, debouncedQuery), [list, debouncedQuery]);
  // only scores that can be saved count towards completion
  const entered = list.filter(
    (course) => isEnteredScore(course?.score) && !errors[course?.key],
  ).length;

  const errorFor = useCallback(
    (course) => {
      const message = errors[course?.key];
      return message && (showAll || touched.has(course?.key)) ? message : null;
    },
    [errors, showAll, touched],
  );

  const markTouched = useCallback((course) => {
    setTouched((previous) => {
      if (previous.has(course?.key)) return previous;
      const next = new Set(previous);
      next.add(course?.key);
      return next;
    });
  }, []);

  const attemptSave = useCallback(() => {
    setShowAll(true);
    return errorCount === 0;
  }, [errorCount]);

  return {
    isLoading,
    error: helperQuery?.error ?? null,
    retry: helperQuery?.refetch,
    isRetrying: Boolean(helperQuery?.isFetching),
    query,
    setQuery,
    visible,
    total: list.length,
    entered,
    completion: list.length > 0 ? (entered / list.length) * 100 : 0,
    errors,
    errorCount,
    errorFor,
    markTouched,
    attemptSave,
  };
};

/** Banner copy for a blocked save: what's wrong, per course. */
export const scoreErrorMessages = (scores, errors, limit = 5) => {
  const problems = toList(scores)
    .filter((course) => errors[course?.key])
    .map(
      (course) =>
        `${course?.course_title ?? course?.course_code ?? "A course"}: ${errors[course.key]}`,
    );
  return problems.length > limit
    ? [...problems.slice(0, limit), `and ${problems.length - limit} more`]
    : problems;
};

/**
 * A 422 from the score endpoints names fields like "scores.2.score"; this
 * names the course instead. Returns null for any other error.
 */
export const describeScoreValidationError = (error, scores) => {
  const fieldErrors = error?.response?.data?.errors;
  if (
    error?.response?.status !== 422 ||
    !fieldErrors ||
    typeof fieldErrors !== "object" ||
    Array.isArray(fieldErrors) ||
    fieldErrors.title
  ) {
    return null;
  }
  const list = toList(scores);
  const messages = Object.entries(fieldErrors).flatMap(([field, fieldMessages]) => {
    const index = field.match(/^scores\.(\d+)\./)?.[1];
    const course = index !== undefined ? list[Number(index)] : null;
    return toList(fieldMessages).map((message) => {
      const text = String(message)
        .replace(/^The scores\.\d+\.(\w+) field/i, "The $1")
        .replace(/scores\.\d+\.(\w+)/g, "$1");
      return course
        ? `${course.course_title ?? course.course_code ?? "A course"}: ${text}`
        : text;
    });
  });
  return { title: "Some scores were not accepted", messages: [...new Set(messages)] };
};

/**
 * Save handler for the score dialogs: blocks the request and explains why
 * when a score is missing or invalid, otherwise calls send(onError), where
 * onError shows the server's answer in the dialog's error banner.
 */
export const submitScores = ({ entry, form, scores, send }) => {
  form.clearFormError();
  if (!entry.attemptSave()) {
    form.setClientError(
      "Some scores can't be saved yet",
      scoreErrorMessages(scores, entry.errors),
    );
    return;
  }
  send((error) => {
    const described = describeScoreValidationError(error, scores);
    if (described) form.setFormError(described);
    else form.handleServerError(error);
  });
};
