import React, {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { reconstructFileFromRedux } from "../../../utils/file/fileReconstruction";
import { TEACHER_COLUMNS } from "../../../utils/teacher/teacherColumns";
import {
  addRepeatableGroup,
  setColumnMapping,
  removeRepeatableGroup,
  setStandardGroupValue,
  setRepeatableGroupValue,
} from "../../../Slices/teacher/teacherSlice";
import VerticalDashedLine from "../../../components/DashedLine/VerticalDashedLine";
import {
  CircleX,
  ChevronDown,
  Plus,
  Dot,
  ArrowRight,
  Trash2,
  TriangleAlert,
  Info,
  CircleCheck,
} from "lucide-react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { analyzeColumns, isLastElement } from "../../../utils/functions";
import { teacherInstanceMap } from "../../../utils/maps/teacher/teacherInstanceMap";
import {
  getSpreadsheetHeaders,
  autoMatchColumns,
  categorizeImportData,
} from "../../../utils/file/fileParser";

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
  const standardColumns = useMemo(
    () => teacherColumns.filter((c) => c.type === "standard_field"),
    [teacherColumns],
  );
  const loadHeaders = useCallback(async () => {
    if (!file || initialLoadDone) return;

    try {
      setLoading(true);
      const headers = await getSpreadsheetHeaders(file);
      setFileHeaders(headers);

      const initialMatch = autoMatchColumns(headers, standardColumns);

      Object.entries(initialMatch).forEach(([programName, matchedHeader]) => {
        if (matchedHeader) {
          dispatch(
            setStandardGroupValue({
              field: programName,
              value: matchedHeader,
              automatched: true,
            }),
          );
        }
      });

      setInitialLoadDone(true);
    } catch (err) {
      console.error("Failed to parse headers from file:", err);
    } finally {
      setLoading(false);
    }
  }, [file, standardColumns, initialLoadDone, dispatch]);

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
    <div className="d-flex flex-column font-size-sm gap-2">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
        style={{ height: "6dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div>
            <span className="font-size-sm fw-semibold">Match your columns</span>
          </div>
          <button
            onClick={() => handleClose()}
            className="border-none border rounded-circle bg-transparent p-0"
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end px-2">
        <span className="fw-semibold">
          {currentStep} of {fullStep} completed
        </span>
      </div>
      <div className="d-flex flex-row align-items-start">
        <div className="d-flex flex-column p-2 w-50 gap-3">
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">Standard Fields</span>
            <input
              type="search"
              className="form-control font-size-sm p-2 rounded-3"
              placeholder="Search Fields"
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center justify-content-between fw-medium">
              <span>Teacher Field</span>
              <span>Your File Column</span>
            </div>
            <div
              className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2"
              style={{ maxHeight: "58dvh" }}
            >
              {teacherColumns
                .filter((c) => c.type === "standard_field")
                .map((column) => {
                  const selectedValue =
                    teacherState?.import?.mapping?.standardFields[
                      column?.program_name
                    ]?.value;
                  return (
                    <>
                      <Fragment>
                        <div className="d-flex flex-row align-items-center justify-content-between p-1 rounded-3 w-100">
                          <div className="d-flex flex-column gap-1 align-items-start text-start">
                            <span className="fw-semibold">{column?.label}</span>
                            {column.required && selectedValue === "" ? (
                              <div className="d-flex flex-row gap-1 align-items-center text-danger">
                                <TriangleAlert size={12} />
                                <small>Required</small>
                              </div>
                            ) : selectedValue === "" && !column.required ? (
                              <div className="d-flex flex-row gap-1 align-items-center text-info">
                                <Info size={12} />
                                <small>Optional</small>
                              </div>
                            ) : !column.required && selectedValue ? (
                              <div className="d-flex flex-row gap-1 align-items-center text-success">
                                <CircleCheck size={12} />
                                <small>Selected Manually</small>
                              </div>
                            ) : column.required && selectedValue ? (
                              <div className="d-flex flex-row gap-1 align-items-center text-success">
                                <CircleCheck size={12} />
                                <small>Selected Manually</small>
                              </div>
                            ) : null}
                          </div>
                          <div className="w-50">
                            <ColumnDropdown
                              options={fileHeaders}
                              onSelect={(value) =>
                                dispatch(
                                  setStandardGroupValue({
                                    value: value,
                                    field: column?.program_name,
                                  }),
                                )
                              }
                              moduleState={teacherState}
                              selectedValue={selectedValue}
                            />
                          </div>
                        </div>
                      </Fragment>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <VerticalDashedLine
          color={"#ddd"}
          dashed={false}
          thickness={1.5}
          height="68dvh"
        />
        <div
          className="d-flex flex-column gap-3 p-2 w-50 font-size-sm"
          style={{ height: "68dvh" }}
        >
          <div className="d-flex flex-column gap-1 pe-2">
            <span className="fw-semibold">Repeatable Groups</span>
            <input
              type="search"
              className="form-control font-size-sm p-2 rounded-3"
              placeholder="Search Groups"
            />
          </div>
          <div
            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2"
            style={{ maxHeight: "60dvh" }}
          >
            {Object.keys(teacherState.import.mapping.repeatableGroups).map(
              (rG) => (
                <Fragment key={rG}>
                  <RepeatableGroupAccordion
                    rG={rG}
                    moduleState={teacherState}
                    fileHeaders={fileHeaders}
                  />
                </Fragment>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
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
            className={`border-none rounded-3 px-3 py-2 border text-white primary-background`}
            onClick={() => {
              // dispatch(setColumnMapping(mapping));
              nextStep && nextStep();
            }}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherImportColumnMatch;

function ColumnDropdown({
  options = [],
  selectedValue,
  onSelect,
  moduleState,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);

  const mappingState = moduleState?.import?.mapping || {};
  const columns = analyzeColumns(
    mappingState?.standardFields,
    mappingState?.repeatableGroups,
    options,
  );

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

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen]);

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
        className={`border-none border bg-transparent rounded-3 d-flex flex-row align-items-center justify-content-between p-2 ${
          isOpen && "shadow-lg"
        }`}
        style={{ width: "100%", cursor: "pointer" }}
        type="button"
      >
        <span className="text-truncate">
          {selectedValue === "" ? "Select Column" : selectedValue}
        </span>
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
            style={{ ...floatingStyles, zIndex: 1000, paddingBottom: "2rem" }}
            {...getFloatingProps()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`bg-white border shadow-sm d-flex flex-column gap-2 p-2 ${
                isOpen && "shadow-lg"
              }`}
              style={{
                width: "28vw",
                minWidth: "180px",
                borderRadius: "0.82rem",
              }}
            >
              <input
                ref={searchInputRef}
                type="search"
                className="form-control font-size-sm p-2 rounded-3"
                placeholder="Search Columns"
              />
              <div
                style={{
                  maxHeight: "32dvh",
                }}
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pb-4 pe-1"
              >
                {columns?.available_columns?.length > 0 && (
                  <div className="d-flex flex-column gap-2">
                    <small className="fw-medium text-muted">
                      Available Columns
                    </small>
                    <div className="d-flex flex-column gap-1">
                      {columns?.available_columns?.map((ac, index) => (
                        <Fragment key={index}>
                          <button
                            type="button"
                            onClick={() => handleSelect(ac)}
                            className={`py-2 px-1 text-start border-none fw-semibold  rounded-2 ${ac === selectedValue ? "primary-backgroun-100 color-primary" : "hover-neutral"}`}
                            style={{ background: "none" }}
                          >
                            {ac}
                          </button>
                          {!isLastElement(
                            index,
                            columns?.available_columns,
                          ) && <hr />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
                {(columns?.already_used_columns?.length > 0 ||
                  columns?.already_used_columns > 0) && (
                  <div className="d-flex flex-column gap-2">
                    <small className="fw-medium text-muted">Already Used</small>
                    <div className="d-flex flex-column gap-1">
                      {columns?.already_used_columns?.map((c, index) => (
                        <Fragment key={index}>
                          <button
                            type="button"
                            onClick={() => handleSelect(c?.column)}
                            className={`py-2 px-1 text-start border-none fw-semibold rounded-2 d-flex flex-column gap-2 ${c?.column === selectedValue ? "color-primary" : "hover-neutral"}`}
                            style={{
                              background:
                                c?.column === selectedValue
                                  ? "#e0f2fe"
                                  : "none",
                            }}
                          >
                            <span>{c?.column}</span>
                            <div
                              className={`d-flex flex-row align-items-center gap-2 fw-medium  ${c?.column === selectedValue ? "color-primary" : " text-muted"}`}
                            >
                              <small>Mapped to</small>
                              <ArrowRight size={16} />
                              {c?.mapped_to.map((mt, mtIndex) => (
                                <Fragment key={mtIndex}>
                                  <small>{mt}</small>
                                  {!isLastElement(mtIndex, c?.mapped_to) && (
                                    <span>,</span>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          </button>
                          {!isLastElement(
                            index,
                            columns?.already_used_columns,
                          ) && <hr />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RepeatableGroupAccordion({ rG, moduleState, fileHeaders }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
  const rgInstance = teacherInstanceMap.find((i) => i.key.toLowerCase() === rG);
  return (
    <div
      className="d-flex flex-column gap-3 border p-2 card"
      style={{ borderRadius: "0.75rem" }}
    >
      <div
        className="d-flex flex-row align-items-center justify-content-between cursor-pointer pe-2"
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <div className="d-flex flex-column gap-2">
          <span className="fw-semibold text-capitalize">
            {rG.replaceAll("_", " ")}
          </span>
          <div className="d-flex flex-row align-items-center gap-1">
            <small
              style={{ background: "#fff2c5", color: "#e27200" }}
              className="px-2 rounded-pill"
            >
              Required
            </small>
            <Dot />
            <small
              style={{ background: "#e3f5e3", color: "#45a245" }}
              className="px-2 rounded-pill"
            >
              1 of
              {
                moduleState?.import?.mapping?.repeatableGroups[rG]?.instances
                  ?.length
              }
              configured
            </small>
            <Dot />
            <small
              style={{ background: "#e0f2fe", color: "#0ea7e9" }}
              className="px-2 rounded-pill"
            >
              Maximum 5 allowed
            </small>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="d-flex align-items-center"
        >
          <button
            type="button"
            className="border-none gap-2 font-size-sm bg-transparent border-0 p-0"
            tabIndex={-1}
          >
            <ChevronDown size={16} />
          </button>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
            className="d-flex flex-column gap-3"
          >
            <div
              className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-2 gap-3"
              style={{ maxHeight: "42dvh" }}
            >
              {moduleState.import.mapping.repeatableGroups[rG].instances.map(
                (g, index) => (
                  <Fragment key={g.id}>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex flex-row align-items-center justify-content-between fw-medium text-capitalize">
                        <span>
                          {rG.replaceAll("_", " ")} #{index + 1}
                        </span>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        {Object.keys(g?.mapping).map((mKey, mIndex) => {
                          const selectedValue = g?.mapping[mKey].value;
                          return (
                            <Fragment key={mIndex}>
                              <div className="d-flex flex-row align-items-center justify-content-between p-1 rounded-3 w-100">
                                <div className="d-flex flex-column gap-1">
                                  <span className="text-capitalize">
                                    {mKey.replaceAll("_", " ")}
                                  </span>
                                  {selectedValue === "" ? (
                                    <div className="d-flex flex-row gap-1 align-items-center text-danger">
                                      <TriangleAlert size={12} />
                                      <small>Required</small>
                                    </div>
                                  ) : (
                                    <div className="d-flex flex-row gap-1 align-items-center text-success">
                                      <CircleCheck size={12} />
                                      <small>Selected Manually</small>
                                    </div>
                                  )}
                                </div>
                                <div className="w-50">
                                  <ColumnDropdown
                                    options={fileHeaders}
                                    onSelect={(value) =>
                                      dispatch(
                                        setRepeatableGroupValue({
                                          value: value,
                                          id: g.id,
                                          field: mKey,
                                          group: rG,
                                        }),
                                      )
                                    }
                                    selectedValue={selectedValue}
                                    moduleState={moduleState}
                                  />
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}
                        <div className="d-flex flex-row gap-2">
                          {index > 0 && (
                            <button
                              className="hover-text-danger border-none bg-transparent border rounded-circle"
                              style={{ width: "2rem", height: "2rem" }}
                              onClick={() =>
                                dispatch(
                                  removeRepeatableGroup({
                                    field: rG,
                                    id: g.id,
                                  }),
                                )
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {!isLastElement(
                      index,
                      moduleState.import.mapping.repeatableGroups[rG].instances,
                    ) && (
                      <HorizontalDashedLine
                        thickness={1}
                        dashed={false}
                        color={"#ddd"}
                      />
                    )}
                  </Fragment>
                ),
              )}
            </div>
            <div className="d-flex flex-row justify-content-end pt-1">
              <button
                type="button"
                className="font-size-sm border-none rounded-3 p-2 bg-transparent border d-flex flex-row align-items-center gap-2"
                onClick={() => dispatch(addRepeatableGroup({ field: rG }))}
              >
                <Plus size={16} />
                <span className="text-capitalize">
                  Add {rG.replaceAll("_", " ")}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
