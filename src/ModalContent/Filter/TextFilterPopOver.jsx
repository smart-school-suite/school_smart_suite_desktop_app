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

export default function TextFilterPopOver({ column, tableRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("contains");
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

  const calculateMatches = useCallback((text, type) => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return 0;

    const allRows = [];
    gridApi.forEachNode((node) => {
      if (node.data) {
        allRows.push(node.data);
      }
    });

    if (text.trim() === "") {
      return allRows.length;
    }

    let matchCount = 0;
    const searchLower = text.toLowerCase();

    for (const row of allRows) {
      const fieldValue = row[column.field];
      if (fieldValue == null) continue;

      const valueStr = String(fieldValue).toLowerCase();
      let matches = false;

      switch (type) {
        case "contains":
          matches = valueStr.includes(searchLower);
          break;
        case "equals":
          matches = valueStr === searchLower;
          break;
        case "startsWith":
          matches = valueStr.startsWith(searchLower);
          break;
        case "endsWith":
          matches = valueStr.endsWith(searchLower);
          break;
        default:
          matches = valueStr.includes(searchLower);
      }

      if (matches) matchCount++;
    }

    return matchCount;
  }, [column, getGridApi]);

  useEffect(() => {
    const count = calculateMatches(searchText, filterType);
    setPreviewCount(count);
  }, [searchText, filterType, calculateMatches]);

  useEffect(() => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return;

    const filterModel = gridApi.getFilterModel();
    setIsFilterActive(!!filterModel?.[column.field]);
  }, [column, getGridApi]);

  const handleApplyFilter = () => {
    const gridApi = getGridApi();
    if (!gridApi || !column?.field) return;

    if (searchText.trim() === "") {
      handleResetFilter();
      return;
    }

    const filterModel = {
      [column.field]: {
        filterType: "text",
        type: filterType,
        filter: searchText,
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
    
    setSearchText("");
    setFilterType("contains");
    setIsFilterActive(false);
    setIsOpen(false);
  };

  const matchOptions = [
    { label: "Contains", value: "contains" },
    { label: "Equals", value: "equals" },
    { label: "Starts With", value: "startsWith" },
    { label: "Ends With", value: "endsWith" },
  ];

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
                  <span className="font-size-sm text-muted">Search</span>
                  <input 
                    type="search" 
                    className="form-control form-control-md font-size-sm" 
                    placeholder={`Search by ${column?.headerName}...`} 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm text-muted">Match</span>
                  <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                    {matchOptions.map((opt) => {
                      const isActive = filterType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setFilterType(opt.value)}
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
                    disabled={!searchText.trim()}
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