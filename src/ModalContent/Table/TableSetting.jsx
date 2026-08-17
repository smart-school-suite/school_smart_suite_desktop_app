import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { Form } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DEFAULT_EXCLUDED_FIELDS = [
  "action",
  "actions",
  "ActionComponent",
  "checkbox",
  "selection",
];

function SortableItem({ id, label }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1050 : "auto",
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card rounded-3 p-2 w-100 bg-white mb-2 user-select-none"
      {...attributes}
      {...listeners}
    >
      <div className="d-flex flex-row align-items-center gap-1">
        <span className="d-flex align-items-center">
          <Icon
            icon="codex:menu"
            width={20}
            height={20}
            className="text-muted"
          />
        </span>
        <span className="ms-1 font-size-sm fw-medium">{label}</span>
      </div>
    </div>
  );
}

/**
 * TableColumnSetting
 *
 * A reusable dual-panel modal for showing/hiding and reordering
 * AG-Grid columns. Works with any grid instance — just pass the
 * grid's ref (must expose getColumnsState / setColumnState).
 *
 * Designed to be invoked either directly:
 *   <TableColumnSetting
 *     handleClose={close}
 *     tableRef={gridRef}
 *     title="Customise Table Columns"
 *     onSaveSuccess={(cols) => ...}
 *   />
 *
 * ...or via a modal manager that passes everything through `rowData`
 * (kept for backwards compatibility with existing call sites):
 *   <TableColumnSetting handleClose={close} rowData={{ tableRef, title, onSaveSuccess }} />
 */
export default function TableColumnSetting(props) {
  const {
    handleClose,
    tableRef: propsTableRef,
    title: propsTitle,
    subtitle: propsSubtitle,
    excludeFields: propsExcludeFields,
    onSaveSuccess: propsOnSaveSuccess,
    rowData = {},
  } = props;

  // Support both direct props and the legacy `rowData` bag.
  const tableRef = propsTableRef ?? rowData.tableRef;
  const title = propsTitle ?? rowData.title ?? "Customise Table Columns";
  const subtitle =
    propsSubtitle ??
    rowData.subtitle ??
    "Select and reorder columns to display in the table";
  const excludeFields =
    propsExcludeFields ?? rowData.excludeFields ?? DEFAULT_EXCLUDED_FIELDS;
  const onSaveSuccess = propsOnSaveSuccess ?? rowData.onSaveSuccess;

  const [columns, setColumns] = useState([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // Extract initial column state from the grid API
  useEffect(() => {
    if (!tableRef?.current?.getColumnsState) return;

    const gridCols = tableRef.current.getColumnsState();
    const filteredCols = gridCols.filter(
      (col) =>
        !col.isSystemColumn &&
        !excludeFields.includes(col.field) &&
        !excludeFields.includes(col.colId),
    );
    setColumns(filteredCols);
    // excludeFields is typically a literal array from the caller and can
    // change identity every render, so we only re-run on tableRef changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRef]);

  // Active (visible) columns subset
  const visibleColumns = useMemo(
    () => columns.filter((c) => !c.hide),
    [columns],
  );

  // Filtered left (All Available) columns search
  const filteredLeftColumns = useMemo(
    () =>
      columns.filter((col) =>
        (col.headerName || col.colId)
          .toLowerCase()
          .includes(leftSearch.toLowerCase()),
      ),
    [columns, leftSearch],
  );

  // Filtered right (Selected Visible) columns search
  const filteredRightColumns = useMemo(
    () =>
      visibleColumns.filter((col) =>
        (col.headerName || col.colId)
          .toLowerCase()
          .includes(rightSearch.toLowerCase()),
      ),
    [visibleColumns, rightSearch],
  );

  const handleToggleHide = useCallback((colId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.colId === colId ? { ...col, hide: !col.hide } : col,
      ),
    );
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumns((prev) => {
      const oldIndex = prev.findIndex((col) => col.colId === active.id);
      const newIndex = prev.findIndex((col) => col.colId === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const handleSaveChanges = useCallback(() => {
    if (tableRef?.current?.setColumnState) {
      const cleanState = columns.map(({ colId, hide }) => ({ colId, hide }));
      tableRef.current.setColumnState(cleanState);
    }
    onSaveSuccess?.(columns);
    handleClose?.();
  }, [tableRef, columns, onSaveSuccess, handleClose]);

  const handleResetToDefault = useCallback(() => {
    const resetState = columns.map((col) => ({
      colId: col.colId,
      hide: false,
    }));

    if (tableRef?.current?.setColumnState) {
      tableRef.current.setColumnState(resetState);
    }

    setColumns((prev) => prev.map((col) => ({ ...col, hide: false })));
    onSaveSuccess?.(resetState);
    handleClose?.();
  }, [tableRef, columns, onSaveSuccess, handleClose]);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Modal Header */}
      <div
        className="d-flex flex-row align-items-center justify-content-between border-bottom rounded-top-4 p-2 "
        style={{ height: "6.5dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-column">
          <span className="font-size-sm fw-semibold">{title}</span>
          <span className="text-muted font-size-sm">{subtitle}</span>
        </div>
        {handleClose && (
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        )}
      </div>

      {/* Main Dual-Column Panel */}
      <div className="d-flex flex-row align-items-start w-100 gap-4 px-2">
        {/* Left Box: All Options Toggle */}
        <div className="w-50 d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
            <div className="d-flex flex-column">
              <span className="fw-bold">Column Options</span>
              <span className="text-muted">Select columns to display</span>
            </div>
            <div
              style={{
                background: "#e0f2fe",
                color: "#0284c7",
                fontSize: "0.7rem",
              }}
              className="rounded-pill px-2 py-0.5 d-flex flex-row align-items-center gap-1 fw-semibold"
            >
              <span>{columns.length} items</span>
            </div>
          </div>
          <input
            type="search"
            placeholder="Search Columns"
            className="font-size-sm form-control w-100"
            value={leftSearch}
            onChange={(e) => setLeftSearch(e.target.value)}
          />
          <div
            className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-3 over-flow-y-auto"
            style={{ height: "45dvh", overflowY: "auto" }}
          >
            <div className="d-flex flex-column gap-2 pe-1">
              {filteredLeftColumns.length === 0 ? (
                <span className="text-muted font-size-sm text-center mt-3">
                  No matching columns
                </span>
              ) : (
                filteredLeftColumns.map((column) => (
                  <div
                    key={column.colId}
                    className="d-flex flex-row gap-2 align-items-center card rounded-3 p-2 w-100 bg-white border user-select-none"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggleHide(column.colId)}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`check-${column.colId}`}
                      checked={!column.hide}
                      onChange={() => {}} // Empty handler - matches original behavior
                    />
                    <span className="font-size-sm m-0 fw-medium">
                      {column.headerName || column.colId}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ width: "0.05rem", height: "64dvh", background: "#dadada" }}
        />

        {/* Right Box: Drag to Reorder */}
        <div className="w-50 d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
            <div className="d-flex flex-column">
              <span className="fw-bold">Selected Columns</span>
              <span className="text-muted">Drag to reorder columns</span>
            </div>
            <div
              style={{
                background: "#e0f2fe",
                color: "#0284c7",
                fontSize: "0.7rem",
              }}
              className="rounded-pill px-2 py-0.5 d-flex flex-row align-items-center gap-1 fw-semibold"
            >
              <span>{visibleColumns.length} Selected</span>
            </div>
          </div>
          <input
            type="search"
            placeholder="Search Selected Columns"
            className="font-size-sm form-control w-100"
            value={rightSearch}
            onChange={(e) => setRightSearch(e.target.value)}
          />

          <div
            className="scroll-bar-sm pe-1"
            style={{ height: "45dvh", overflowY: "auto", overflowX: "hidden" }}
          >
            {filteredRightColumns.length === 0 ? (
              <span className="text-muted font-size-sm text-center d-block mt-3">
                No columns selected
              </span>
            ) : (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={filteredRightColumns.map((c) => c.colId)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredRightColumns.map((column) => (
                    <SortableItem
                      key={column.colId}
                      id={column.colId}
                      label={column.headerName || column.colId}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>

      {/* Modal Actions Footer */}
      <div className="d-flex flex-row align-items-center justify-content-between mt-2 border-top px-2" style={{ height: "8dvh" }}>
        <button
          className="border-none bg-transparent font-size-sm color-primary p-0"
          onClick={handleResetToDefault}
        >
          Reset to Default
        </button>
        <div className="d-flex flex-row align-items-center gap-2">
          <button
            className="border-none border bg-transparent px-3 py-2 font-size-sm rounded-3"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="border-none primary-background text-white font-size-sm rounded-3 px-3 py-2"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
