import React, {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getSpreadsheetHeaders,
  autoMatchColumns,
  categorizeImportData
} from "../../../utils/file/fileParser";
import { reconstructFileFromRedux } from "../../../utils/file/fileReconstruction";
import { TEACHER_COLUMNS } from "../../../utils/teacher/teacherColumns";
import { setColumnMapping } from "../../../Slices/teacher/teacherSlice";

function TeacherImportColumnMatch({
  handleClose,
  nextStep,
  previousStep,
  currentStep,
  fullStep,
}) {
  const teacherState = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const file = useMemo(() => {
    const serializedFile = teacherState?.import?.selectedFile?.serializedFile;
    if (!serializedFile) return null;
    try {
      return reconstructFileFromRedux(serializedFile);
    } catch (error) {
      console.error("Failed to reconstruct file:", error);
      return null;
    }
  }, [teacherState?.import?.selectedFile?.serializedFile]);

  const [fileHeaders, setFileHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const teacherColumns = useMemo(() => TEACHER_COLUMNS, []);

  const loadHeaders = useCallback(async () => {
    if (!file || initialLoadDone) return;

    try {
      setLoading(true);
      const headers = await getSpreadsheetHeaders(file);
      setFileHeaders(headers);
      const initialMatch = autoMatchColumns(headers, teacherColumns);
      setMapping(initialMatch);
      setInitialLoadDone(true);
    } catch (err) {
      console.error("Failed to parse headers from file:", err);
    } finally {
      setLoading(false);
    }
  }, [file, teacherColumns, initialLoadDone]);

  useEffect(() => {
    loadHeaders();
  }, [loadHeaders]);

  const handleSelectHeader = useCallback((programName, selectedHeader) => {
    setMapping((prev) => ({
      ...prev,
      [programName]: selectedHeader,
    }));
  }, []);

  const totalFields = useMemo(() => teacherColumns.length, [teacherColumns]);

  const matchedCount = useMemo(() => {
    return Object.values(mapping).filter(Boolean).length;
  }, [mapping]);

  const missingRequiredFields = useMemo(() => {
    return teacherColumns.filter(
      (col) => col.required && !mapping[col.program_name],
    );
  }, [teacherColumns, mapping]);

  const allRequiredMatched = useMemo(() => {
    return missingRequiredFields.length === 0;
  }, [missingRequiredFields]);

  const alertContent = useMemo(() => {
    if (loading) {
      return (
        <div className="p-3 border rounded-4 d-flex align-items-center justify-content-center gap-2">
          <Icon
            icon="solar:spinner-single-bold"
            className="spin"
            width={20}
            height={20}
          />
          <span>Reading columns...</span>
        </div>
      );
    }

    return (
      <div
        className={`alert ${
          allRequiredMatched ? "alert-success" : "alert-warning"
        } d-flex flex-column rounded-4 m-0`}
      >
        <span className="fw-medium">
          {matchedCount} of {totalFields} columns matched
        </span>
        <small>
          {allRequiredMatched
            ? "All required fields are matched"
            : `Missing required: ${missingRequiredFields
                .map((f) => f.label)
                .join(", ")}`}
        </small>
      </div>
    );
  }, [
    loading,
    allRequiredMatched,
    matchedCount,
    totalFields,
    missingRequiredFields,
  ]);

  const columnMappings = useMemo(() => {
    return teacherColumns.map((col) => {
      const selectedHeader = mapping[col.program_name] || "";
      const dropdownOptions = ["-- Do not import --", ...fileHeaders];

      return {
        ...col,
        selectedHeader,
        dropdownOptions,
      };
    });
  }, [teacherColumns, mapping, fileHeaders]);
  return (
    <div className="d-flex flex-column font-size-sm gap-3">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="fw-semibold">Import Teacher</span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleClose && handleClose()}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>

      <div className="d-flex flex-row justify-content-end">
        <span>
          {currentStep} of {fullStep} completed
        </span>
      </div>

      <div>
        <span className="fw-medium">Match your columns</span>
        <p className="text-muted m-0">
          We've matched your spreadsheet columns to teacher fields. Review the
          matches before continuing.
        </p>
      </div>

      {alertContent}

      <div className="d-flex flex-column gap-2">
        <span className="fw-semibold">Mappings</span>
        <div className="d-flex flex-row align-items-center justify-content-between text-capitalize">
          <span>Teacher Field</span>
          <span>Your File Column</span>
        </div>

        <div
          className="d-flex flex-column gap-2 scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto px-1"
          style={{ maxHeight: "40dvh" }}
        >
          {columnMappings.map((col) => (
            <Fragment key={col.program_name}>
              <div
                className="card p-2 d-flex flex-row justify-content-between align-items-center"
                style={{ borderRadius: "0.8rem" }}
              >
                <div
                  className="d-flex flex-column gap-1"
                  style={{ width: "40%" }}
                >
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-medium">{col.label}</span>
                    {col.required ? (
                      <span className="text-danger">*</span>
                    ) : (
                      <small className="text-muted font-size-xs">
                        (Optional)
                      </small>
                    )}
                  </div>
                </div>
                <div style={{ width: "18%" }}>
                  <Icon
                    icon="mingcute:arrow-right-line"
                    width={16}
                    height={16}
                  />
                </div>
                <ColumnDropdown
                  options={col.dropdownOptions}
                  selectedValue={col.selectedHeader || "-- Do not import --"}
                  onSelect={(val) =>
                    handleSelectHeader(
                      col.program_name,
                      val === "-- Do not import --" ? "" : val,
                    )
                  }
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <button
            className="border-none bg-transparent d-flex flex-row align-items-center gap-2"
            onClick={() => previousStep()}
          >
            <span style={{ lineHeight: 0 }}>
              <Icon
                icon="material-symbols:arrow-back-rounded"
                width={16}
                height={16}
              />
            </span>
            <span>Back</span>
          </button>
          <button
            className={`border-none rounded-3 px-3 py-2 border text-white ${
              allRequiredMatched && !loading
                ? "primary-background"
                : "bg-secondary opacity-50 cursor-not-allowed"
            }`}
            disabled={!allRequiredMatched || loading}
            onClick={() => {
              dispatch(setColumnMapping(mapping))
               nextStep && nextStep()
            }}
          >
           Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherImportColumnMatch;

function ColumnDropdown({ options = [], selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(6),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleSelect = useCallback(
    (option) => {
      setIsOpen(false);
      if (onSelect) {
        onSelect(option);
      }
    },
    [onSelect],
  );

  return (
    <div>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="border-none border bg-transparent rounded-3 d-flex flex-row align-items-center justify-content-between p-2"
        style={{ width: "20vw", minWidth: "180px", cursor: "pointer" }}
        type="button"
      >
        <span className="text-truncate">{selectedValue}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="d-flex align-items-center"
        >
          <Icon icon="majesticons:chevron-down" width={16} height={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 1000 }}
            {...getFloatingProps()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-white border shadow-sm d-flex flex-column gap-2 scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto p-1"
              style={{
                width: "20vw",
                minWidth: "180px",
                borderRadius: "0.82rem",
                maxHeight: "20dvh",
              }}
            >
              {options.map((option, index) => {
                const isSelected = selectedValue === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="p-2 cursor-pointer text-dark rounded-2 hover-bg-primary-100 hover-text-primary-400 d-flex flex-row justify-content-start border-none"
                    style={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#e0f2fe" : "transparent",
                      fontWeight: isSelected ? "600" : "normal",
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
