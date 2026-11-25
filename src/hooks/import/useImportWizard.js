import { useCallback, useMemo, useRef, useState } from "react";
import {
  autoMatch,
  emptyGroupInstance,
  groupMax,
  groupMin,
  mappingProblems,
  parseImportFile,
  splitColumns,
} from "../../utils/file/importSpreadsheet";

const EMPTY_MAPPING = { standardFields: {}, repeatableGroups: {} };

/**
 * State of one import, from choosing the file to sending it.
 *
 * Kept in the wizard itself (not redux): the File object and its rows stay
 * in memory, so nothing has to be serialized, a reload cannot leave a broken
 * half-import behind, and closing the dialog starts the next import clean.
 *
 * The module's column config (TEACHER_COLUMNS...) is the only input; the
 * mapping is built from it, so it works the same for every module.
 */
export function useImportWizard(columns = []) {
  const safeColumns = useMemo(() => (Array.isArray(columns) ? columns : []), [columns]);
  const { groups } = useMemo(() => splitColumns(safeColumns), [safeColumns]);

  const [file, setFile] = useState(null);
  const [sheet, setSheet] = useState(null); // { headers, rows, info }
  const [status, setStatus] = useState("idle"); // idle | reading | ready | error
  const [fileError, setFileError] = useState(null); // { title, description }
  const [mapping, setMapping] = useState(EMPTY_MAPPING);
  const readToken = useRef(0);

  const chooseFile = useCallback(
    async (nextFile) => {
      if (!nextFile) return;
      // A newer choice wins over a slower read still in progress.
      const token = (readToken.current += 1);
      setStatus("reading");
      setFileError(null);

      try {
        const parsed = await parseImportFile(nextFile);
        if (token !== readToken.current) return;
        setFile(nextFile);
        setSheet(parsed);
        setMapping(autoMatch(parsed.headers, safeColumns));
        setStatus("ready");
      } catch (error) {
        if (token !== readToken.current) return;
        setFile(null);
        setSheet(null);
        setMapping(EMPTY_MAPPING);
        setFileError({
          title: error?.title ?? "The file could not be read",
          description: error?.description ?? "Check the file and try again.",
        });
        setStatus("error");
      }
    },
    [safeColumns],
  );

  const clearFile = useCallback(() => {
    readToken.current += 1;
    setFile(null);
    setSheet(null);
    setMapping(EMPTY_MAPPING);
    setFileError(null);
    setStatus("idle");
  }, []);

  const setField = useCallback((field, header) => {
    setMapping((current) => ({
      ...current,
      standardFields: { ...current.standardFields, [field]: { value: header ?? "", auto: false } },
    }));
  }, []);

  const setGroupField = useCallback((groupName, instanceId, field, header) => {
    setMapping((current) => ({
      ...current,
      repeatableGroups: {
        ...current.repeatableGroups,
        [groupName]: (current.repeatableGroups[groupName] ?? []).map((instance) =>
          instance.id === instanceId
            ? { ...instance, mapping: { ...instance.mapping, [field]: { value: header ?? "", auto: false } } }
            : instance,
        ),
      },
    }));
  }, []);

  const addGroupInstance = useCallback(
    (groupName) => {
      const group = groups.find((item) => item.program_name === groupName);
      if (!group) return;
      setMapping((current) => {
        const instances = current.repeatableGroups[groupName] ?? [];
        if (instances.length >= groupMax(group)) return current;
        return {
          ...current,
          repeatableGroups: { ...current.repeatableGroups, [groupName]: [...instances, emptyGroupInstance(group)] },
        };
      });
    },
    [groups],
  );

  const removeGroupInstance = useCallback(
    (groupName, instanceId) => {
      const group = groups.find((item) => item.program_name === groupName);
      if (!group) return;
      setMapping((current) => {
        const instances = current.repeatableGroups[groupName] ?? [];
        if (instances.length <= groupMin(group)) return current;
        return {
          ...current,
          repeatableGroups: {
            ...current.repeatableGroups,
            [groupName]: instances.filter((instance) => instance.id !== instanceId),
          },
        };
      });
    },
    [groups],
  );

  /** Undo manual changes: match the columns again from the headers. */
  const rematch = useCallback(() => {
    if (sheet) setMapping(autoMatch(sheet.headers, safeColumns));
  }, [sheet, safeColumns]);

  const problems = useMemo(
    () => (sheet ? mappingProblems(mapping, safeColumns) : []),
    [sheet, mapping, safeColumns],
  );

  return {
    columns: safeColumns,
    file,
    sheet,
    status,
    fileError,
    mapping,
    problems,
    canMatch: status === "ready" && Boolean(sheet),
    canReview: status === "ready" && Boolean(sheet) && problems.length === 0,
    chooseFile,
    clearFile,
    setField,
    setGroupField,
    addGroupInstance,
    removeGroupInstance,
    rematch,
  };
}
