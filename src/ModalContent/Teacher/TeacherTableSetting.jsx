import React, { useState, useEffect, useMemo } from "react";
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

function TeacherTableSetting({ handleClose, rowData }) {
  const { tableRef } = rowData;

  const [columns, setColumns] = useState([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  useEffect(() => {
    if (tableRef?.current?.getColumnsState) {
      const gridCols = tableRef.current.getColumnsState();
      const filteredCols = gridCols.filter(
        (col) =>
          !col.isSystemColumn &&
          col.field !== "action" &&
          col.colId !== "actions" &&
          col.colId !== "ActionComponent",
      );
      setColumns(filteredCols);
    }
  }, [tableRef]);

  const visibleColumns = useMemo(
    () => columns.filter((c) => !c.hide),
    [columns],
  );

  const filteredLeftColumns = columns.filter((col) =>
    col.headerName.toLowerCase().includes(leftSearch.toLowerCase()),
  );

  const filteredRightColumns = visibleColumns.filter((col) =>
    col.headerName.toLowerCase().includes(rightSearch.toLowerCase()),
  );

  const handleToggleHide = (colId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.colId === colId ? { ...col, hide: !col.hide } : col,
      ),
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumns((prev) => {
      const oldIndex = prev.findIndex((col) => col.colId === active.id);
      const newIndex = prev.findIndex((col) => col.colId === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSaveChanges = () => {
    if (tableRef?.current?.setColumnState) {
      const cleanState = columns.map(({ colId, hide }) => ({ colId, hide }));
      tableRef.current.setColumnState(cleanState);
    }
    handleClose();
  };

  const handleResetToDefault = () => {
    if (tableRef?.current?.setColumnState) {
      const resetState = columns.map((col) => ({
        colId: col.colId,
        hide: false,
      }));
      tableRef.current.setColumnState(resetState);
      setColumns(columns.map((col) => ({ ...col, hide: false })));
    }
    handleClose();
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-column gap-1">
          <span className="font-size-md fw-bold">Customise Table Columns</span>
          <span className="text-muted font-size-sm">
            Select and reorder columns to display in the table
          </span>
        </div>
        <span onClick={handleClose} style={{ cursor: "pointer" }}>
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>

      <div className="d-flex flex-row align-items-start w-100 gap-4">
        <div className="w-50 d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
            <div className="d-flex flex-column">
              <span className="fw-bold">Column Options</span>
              <span className="text-muted">
                Select the columns to see on this table
              </span>
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
                    onChange={() => {}}
                  />
                  <span className="font-size-sm m-0 fw-medium">
                    {column.headerName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ width: "0.05rem", height: "55dvh", background: "#dadada" }}
        ></div>

        <div className="w-50 d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
            <div className="d-flex flex-column">
              <span className="fw-bold">Selected Columns</span>
              <span className="text-muted">
                Drag to reorder columns on this table
              </span>
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
                    label={column.headerName}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>

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

export default TeacherTableSetting;
