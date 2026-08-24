import React, { useState, Fragment } from "react";
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
import { CircleX } from "lucide-react";

function SortableItem({ id, item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card rounded-3 p-2 w-100 bg-white mb-2 user-select-none"
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
        <span className="ms-1 font-size-sm fw-medium">{item.headerName}</span>
      </div>
    </div>
  );
}

function FilterColumns({ rowData, handleClose }) {
  const { setColumns, columns } = rowData;

  const [localAvailable, setLocalAvailable] = useState(
    columns.availableColumns || [],
  );
  const [localSelected, setLocalSelected] = useState(
    columns.selectedColumns || [],
  );

  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleCheckboxToggle = (columnItem) => {
    const isCurrentlySelected = localSelected.some(
      (col) => col.field === columnItem.field,
    );

    if (isCurrentlySelected) {
      setLocalSelected(
        localSelected.filter((col) => col.field !== columnItem.field),
      );
    } else {
      setLocalSelected([...localSelected, columnItem]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalSelected((items) => {
      const oldIndex = items.findIndex((item) => item.field === active.id);
      const newIndex = items.findIndex((item) => item.field === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const filteredAvailable = localAvailable.filter((c) =>
    c?.headerName?.toLowerCase().includes(searchAvailable.toLowerCase()),
  );

  const filteredSelected = localSelected.filter((c) =>
    c?.headerName?.toLowerCase().includes(searchSelected.toLowerCase()),
  );

  const handleSave = () => {
    setColumns({
      availableColumns: localAvailable,
      selectedColumns: localSelected,
    });
    handleClose();
  };

  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">
                Customize Filter Columns
              </span>
              <span className="text-muted font-size-sm">
                Select and reorder columns to display in the filter list
              </span>
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
        <div className="d-flex flex-row align-items-start  gap-4 px-2">
          <div className="w-50 d-flex flex-column gap-3">
            <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
              <div className="d-flex flex-column">
                <span className="fw-bold">Column Options</span>
                <span className="text-muted">
                  Select the columns you will like to filter
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
                <span>{filteredAvailable.length} items</span>
              </div>
            </div>
            <input
              type="search"
              placeholder="Search Columns"
              className="font-size-sm form-control w-100"
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
            <span className="font-size-sm">Columns</span>
            <div
              className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-3 over-flow-y-auto"
              style={{ height: "45dvh", overflowY: "auto" }}
            >
              <div className="d-flex flex-column gap-2 pe-1">
                {filteredAvailable.map((c, index) => {
                  const isChecked = localSelected.some(
                    (col) => col.field === c.field,
                  );
                  return (
                    <Fragment key={c.field || index}>
                      <div className="d-flex flex-row align-items-center gap-2 card rounded-3 p-2">
                        <Form.Check
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxToggle(c)}
                        />
                        <span className="font-size-sm">{c?.headerName}</span>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            style={{ width: "0.05rem", height: "64dvh", background: "#dadada" }}
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
                <span>{localSelected.length} Selected</span>
              </div>
            </div>
            <input
              type="search"
              placeholder="Search Selected Columns"
              className="font-size-sm form-control w-100"
              value={searchSelected}
              onChange={(e) => setSearchSelected(e.target.value)}
            />
            <div
              className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-3 over-flow-y-auto"
              style={{ height: "45dvh", overflowY: "auto" }}
            >
              <div className="d-flex flex-column gap-2">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={filteredSelected.map((c) => c.field)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredSelected.map((c, index) => (
                      <Fragment key={c.field || index}>
                        <SortableItem id={c.field} item={c} />
                      </Fragment>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end mt-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                onClick={handleClose}
                className="border-none border bg-transparent px-3 py-2 font-size-sm rounded-3"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="border-none primary-background text-white font-size-sm rounded-3 px-3 py-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterColumns;
