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

export default function SpecialtyTableColumnSettings({ handleClose, rowData }) {
  const {
    tableRef: activeTableRef,
    title = "Customise Table Columns",
    subtitle = "Select and reorder columns to display in the table",
    excludeFields = [
      "action",
      "actions",
      "ActionComponent",
      "checkbox",
      "selection",
    ],
    onSaveSuccess,
  } = rowData;

  const [columns, setColumns] = useState([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // Extract initial column state from Grid API
  useEffect(() => {
    if (activeTableRef?.current?.getColumnsState) {
      const gridCols = activeTableRef.current.getColumnsState();
      const filteredCols = gridCols.filter(
        (col) =>
          !col.isSystemColumn &&
          !excludeFields.includes(col.field) &&
          !excludeFields.includes(col.colId),
      );
      setColumns(filteredCols);
    }
  }, [activeTableRef, excludeFields]);

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

  // Toggle Visibility - matches original behavior
  const handleToggleHide = (colId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.colId === colId ? { ...col, hide: !col.hide } : col,
      ),
    );
  };

  // Reorder Handler using Drag & Drop - matches original
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumns((prev) => {
      const oldIndex = prev.findIndex((col) => col.colId === active.id);
      const newIndex = prev.findIndex((col) => col.colId === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // Commit changes back to AG-Grid API
  const handleSaveChanges = () => {
    if (activeTableRef?.current?.setColumnState) {
      const cleanState = columns.map(({ colId, hide }) => ({ colId, hide }));
      activeTableRef.current.setColumnState(cleanState);
    }
    if (onSaveSuccess) onSaveSuccess(columns);
    handleClose?.();
  };

  // Reset columns back to fully visible state
  const handleResetToDefault = () => {
    const resetState = columns.map((col) => ({
      colId: col.colId,
      hide: false,
    }));

    if (activeTableRef?.current?.setColumnState) {
      activeTableRef.current.setColumnState(resetState);
    }

    setColumns((prev) => prev.map((col) => ({ ...col, hide: false })));
    if (onSaveSuccess) onSaveSuccess(resetState);
    handleClose?.();
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Modal Header */}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-column gap-1">
          <span className="font-size-md fw-bold">{title}</span>
          <span className="text-muted font-size-sm">{subtitle}</span>
        </div>
        {handleClose && (
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        )}
      </div>

      {/* Main Dual-Column Panel */}
      <div className="d-flex flex-row align-items-start w-100 gap-4">
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
              {filteredLeftColumns.map((column) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ width: "0.05rem", height: "55dvh", background: "#dadada" }}
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
          </div>
        </div>
      </div>

      {/* Modal Actions Footer */}
      <div className="d-flex flex-row align-items-center justify-content-between mt-2">
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