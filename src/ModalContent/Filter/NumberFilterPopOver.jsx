import React, { useState, useEffect, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function NumberFilterPopOver({ column, tableRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("equals");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [previewCount, setPreviewCount] = useState(0);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const popoverVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -4 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 },
  };

  const getGridApi = useCallback(() => {
    return tableRef?.current?.getGridApi ? tableRef.current.getGridApi() : null;
  }, [tableRef]);

  const calculateMatches = useCallback((type, val1, val2) => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return 0;

    const allRows = [];
    gridApi.forEachNode((node) => {
      if (node.data) {
        allRows.push(node.data);
      }
    });

    if (val1 === "" && type !== "empty") {
      return allRows.length;
    }

    let matchCount = 0;
    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);

    for (const row of allRows) {
      const fieldValue = row[column.field];
      if (fieldValue == null) {
        if (type === "empty") {
          matchCount++;
        }
        continue;
      }

      const numValue = parseFloat(fieldValue);
      if (isNaN(numValue)) continue;

      let matches = false;

      switch (type) {
        case "equals":
          matches = numValue === num1;
          break;
        case "greater":
          matches = numValue > num1;
          break;
        case "less":
          matches = numValue < num1;
          break;
        case "greaterOrEqual":
          matches = numValue >= num1;
          break;
        case "lessOrEqual":
          matches = numValue <= num1;
          break;
        case "between":
          matches = numValue >= num1 && numValue <= num2;
          break;
        case "empty":
          matches = fieldValue === null || fieldValue === undefined || fieldValue === "";
          break;
        default:
          matches = false;
      }

      if (matches) matchCount++;
    }

    return matchCount;
  }, [column, getGridApi]);

  useEffect(() => {
    const count = calculateMatches(filterType, value1, value2);
    setPreviewCount(count);
  }, [filterType, value1, value2, calculateMatches]);

  useEffect(() => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return;

    const filterModel = gridApi.getFilterModel();
    setIsFilterActive(!!filterModel?.[column.field]);
  }, [column, getGridApi]);

  const handleApplyFilter = () => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return;

    if (filterType === "empty") {
      gridApi.setFilterModel({
        [column.field]: {
          filterType: "number",
          type: "empty",
        },
      });
      gridApi.onFilterChanged();
      setIsFilterActive(true);
      setIsOpen(false);
      return;
    }

    if (value1 === "") {
      return;
    }

    const filterModel = {
      [column.field]: {
        filterType: "number",
        type: filterType,
        filter: parseFloat(value1),
        filterTo: filterType === "between" ? parseFloat(value2) : undefined,
      },
    };

    gridApi.setFilterModel(filterModel);
    gridApi.onFilterChanged();
    setIsFilterActive(true);
    setIsOpen(false);
  };

  const handleResetFilter = () => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return;

    gridApi.setFilterModel(null);
    gridApi.onFilterChanged();
    setValue1("");
    setValue2("");
    setFilterType("equals");
    setIsFilterActive(false);
    setIsOpen(false);
  };

  const matchOptions = [
    { label: "Equals", value: "equals" },
    { label: ">", value: "greater" },
    { label: "<", value: "less" },
    { label: "≥", value: "greaterOrEqual" },
    { label: "≤", value: "lessOrEqual" },
    { label: "Between", value: "between" },
    { label: "Empty", value: "empty" },
  ];

  const isValueRequired = filterType !== "empty";
  const showSecondInput = filterType === "between";

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
         className={`border-none rounded-3 px-2 font-size-sm d-flex flex-row align-items-center gap-1  ${ isFilterActive ? "primary-background-100 color-primary border-primary" : "white-bg border"}`}
        style={{ fontSize: "0.7rem", cursor: "pointer", padding:"0.45rem" }}
      >
        <span style={{ lineHeight: "16px" }}>{column?.headerName}</span>
        {isFilterActive && (
          <span className="ms-1" style={{ fontSize: "0.6rem" }}>●</span>
        )}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-index-master"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={popoverVariants}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="card p-2 d-flex flex-column gap-3 shadow-sm white-bg"
                style={{ width: "24vw", borderRadius: "0.8rem" }}
              >
                <span className="font-size-sm fw-bold">{column?.headerName}</span>

                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm text-muted">Match</span>
                  <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                    {matchOptions.map((opt) => {
                      const isActive = filterType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setFilterType(opt.value);
                            if (opt.value === "empty") {
                              setValue1("");
                              setValue2("");
                            }
                          }}
                          className="border-none px-2 py-1 font-size-sm rounded-3"
                          style={{
                            backgroundColor: isActive ? "#e0f2fe" : "transparent",
                            color: isActive ? "#38bff8" : "#333",
                            border: isActive ? "none" : "1px solid #eee",
                            transition: "all 0.2s"
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isValueRequired && (
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm text-muted">Value</span>
                    <input
                      type="number"
                      className="form-control form-control-md font-size-sm"
                      placeholder="Enter number..."
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                    />
                  </div>
                )}

                {showSecondInput && (
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm text-muted">To</span>
                    <input
                      type="number"
                      className="form-control form-control-md font-size-sm"
                      placeholder="Enter number..."
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                    />
                  </div>
                )}

                <div className="d-flex flex-column gap-1 font-size-sm">
                  <span className="fw-medium text-muted">Preview</span>
                  <span><strong>{previewCount}</strong> matches found</span>
                </div>

                <div className="d-flex flex-row align-items-center justify-content-between gap-2 pt-2">
                  <button
                    onClick={handleResetFilter}
                    className="border-none bg-transparent font-size-sm w-50 border px-3 py-2 rounded-3"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilter}
                    className="border-none primary-background text-white font-size-sm px-3 py-2 rounded-3 w-50"
                    disabled={
                      (filterType !== "empty" && value1 === "") ||
                      (filterType === "between" && (value1 === "" || value2 === ""))
                    }
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}