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

export default function DateFilterPopOver({ column, tableRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("on");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
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

  const calculateMatches = useCallback((type, d1, d2) => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return 0;

    const allRows = [];
    gridApi.forEachNode((node) => {
      if (node.data) {
        allRows.push(node.data);
      }
    });

    if (type === "empty") {
      let matchCount = 0;
      for (const row of allRows) {
        const fieldValue = row[column.field];
        if (fieldValue === null || fieldValue === undefined || fieldValue === "") {
          matchCount++;
        }
      }
      return matchCount;
    }

    if (d1 === "") {
      return allRows.length;
    }

    let matchCount = 0;
    const date1Obj = new Date(d1);
    const date2Obj = d2 ? new Date(d2) : null;

    for (const row of allRows) {
      const fieldValue = row[column.field];
      if (fieldValue == null) continue;

      const rowDate = new Date(fieldValue);
      if (isNaN(rowDate.getTime())) continue;

      let matches = false;

      switch (type) {
        case "before":
          matches = rowDate < date1Obj;
          break;
        case "after":
          matches = rowDate > date1Obj;
          break;
        case "on":
          matches = 
            rowDate.getFullYear() === date1Obj.getFullYear() &&
            rowDate.getMonth() === date1Obj.getMonth() &&
            rowDate.getDate() === date1Obj.getDate();
          break;
        case "between":
          if (date2Obj) {
            matches = rowDate >= date1Obj && rowDate <= date2Obj;
          }
          break;
        default:
          matches = false;
      }

      if (matches) matchCount++;
    }

    return matchCount;
  }, [column, getGridApi]);

  useEffect(() => {
    const count = calculateMatches(filterType, date1, date2);
    setPreviewCount(count);
  }, [filterType, date1, date2, calculateMatches]);

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
          filterType: "date",
          type: "empty",
        },
      });
      gridApi.onFilterChanged();
      setIsFilterActive(true);
      setIsOpen(false);
      return;
    }

    if (date1 === "") {
      return;
    }

    const filterModel = {
      [column.field]: {
        filterType: "date",
        type: filterType,
        dateFrom: date1,
        dateTo: filterType === "between" ? date2 : undefined,
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
    setDate1("");
    setDate2("");
    setFilterType("on");
    setIsFilterActive(false);
    setIsOpen(false);
  };

  const matchOptions = [
    { label: "Before", value: "before" },
    { label: "After", value: "after" },
    { label: "On", value: "on" },
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
        className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
        style={{ fontSize: "0.7rem", cursor: "pointer" }}
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
                              setDate1("");
                              setDate2("");
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
                    <span className="font-size-sm text-muted">Date</span>
                    <input
                      type="date"
                      className="form-control form-control-md font-size-sm"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                    />
                  </div>
                )}

                {showSecondInput && (
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm text-muted">To</span>
                    <input
                      type="date"
                      className="form-control form-control-md font-size-sm"
                      value={date2}
                      onChange={(e) => setDate2(e.target.value)}
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
                      (filterType !== "empty" && date1 === "") ||
                      (filterType === "between" && (date1 === "" || date2 === ""))
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