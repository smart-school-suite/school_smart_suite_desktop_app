import React, { Fragment, useState, useMemo } from "react";
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
import toast from "react-hot-toast";

import ExportGenerationService from "../../services/export/ExportGenerationService";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import { EXPORT_FORMAT, EXPORT_LABEL } from "@/constants";

function SortableColumnItem({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.field });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card rounded-2 p-2 w-100 cursor-grab ${
        isDragging ? "border-primary" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="d-flex flex-row align-items-center gap-1">
        <Icon icon="codex:menu" width={20} height={20} className="text-muted" />
        <span className="ms-1">{column.headerName}</span>
      </div>
    </div>
  );
}

function Export({ handleClose, rowData }) {
  const {
    tableRef,
    columns = [],
    title = "Export Data",
    subtitle = "Data Export",
    fileName = "export_data",
  } = rowData;
  const tableInstance = tableRef?.current;
  const selectedRows = tableInstance?.getSelectedRows?.() || [];
  const currentPageRows = tableInstance?.getCurrentPageRows?.() || [];
  const allTableData = tableInstance?.getAllTableData?.() || [];
  const filteredTableData = tableInstance?.getAllFilteredData?.() || [];

  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [scope, setScope] = useState("all");
  const [format, setFormat] = useState(EXPORT_FORMAT.PDF);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColumns = useMemo(() => {
    return columns.filter((col) =>
      col.headerName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [columns, searchQuery]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSelectedColumns((items) => {
        const oldIndex = items.findIndex((item) => item.field === active.id);
        const newIndex = items.findIndex((item) => item.field === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getPreviewRows = () => {
    if (scope === "selected") return selectedRows;
    if (scope === "current") return currentPageRows;
    if (scope === "filtered") return filteredTableData;
    return allTableData;
  };

  const handleGenerate = async () => {
    const payload = {
      format,
      title,
      subtitle,
      fileName,
      columns: selectedColumns.map((column) => ({
        field: column.field,
        header: column.headerName,
      })),
      rows: getPreviewRows(),
    };

    const result = await ExportGenerationService.generate(payload);

    if (result?.success) {
      toast.custom(
        <ToastSuccess
          title={"Generation Successful"}
          description={"Export generated and saved successfully."}
        />,
      );
      handleClose();
    } else if (!result?.cancelled) {
      toast.custom(
        <ToastWarning
          title={"Generation Failed"}
          description={"An error occurred while generating the export."}
        />,
      );
    }
  };

  return (
    <div className="d-flex flex-column font-size-sm">
      {/* Header */}
      <div className="d-flex flex-row align-items-center justify-content-between px-1 mb-2">
        <span className="fw-bold">{title}</span>
        <button
          onClick={handleClose}
          className="border-none bg-transparent cursor-pointer"
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </button>
      </div>

      {/* Main Body Grid */}
      <div className="d-flex flex-row align-items-start w-100 gap-2">
        {/* Left Column Controls */}
        <div
          style={{ width: "50%", maxHeight: "70dvh" }}
          className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-3 over-flow-y-auto height-auto px-1"
        >
          {/* Scope Selector */}
          <div>
            <div>
              <span className="fw-bold">Export Scope</span>
              <p className="text-muted">
                Select which records should be included in this export.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <div
                className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${
                  scope === "all" ? "border-primary" : ""
                }`}
                onClick={() => setScope("all")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">All Records</span>
                  <span>{allTableData.length} rows</span>
                </div>
                <p className="m-0 text-muted">
                  Export every record matching current dataset.
                </p>
              </div>

              <div
                className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${
                  scope === "current" ? "border-primary" : ""
                }`}
                onClick={() => setScope("current")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Current Page</span>
                  <span>{currentPageRows.length} rows</span>
                </div>
                <p className="m-0 text-muted">
                  Export only records visible on current page.
                </p>
              </div>

              <div
                className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${
                  scope === "selected" ? "border-primary" : ""
                }`}
                onClick={() => setScope("selected")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Selected Rows</span>
                  <span>{selectedRows.length} selected</span>
                </div>
                <p className="m-0 text-muted">
                  Export only rows selected in the table.
                </p>
              </div>

              <div
                className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${
                  scope === "filtered" ? "border-primary" : ""
                }`}
                onClick={() => setScope("filtered")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Filtered Rows</span>
                  <span>{filteredTableData.length} rows</span>
                </div>
                <p className="m-0 text-muted">
                  Export only rows currently filtered.
                </p>
              </div>
            </div>
          </div>

          {/* Format Options */}
          <div className="d-flex flex-column gap-2">
            <span className="fw-bold">Format</span>
            <div className="d-flex flex-row align-items-center flex-wrap gap-2">
              {/* PDF */}
              <div
                className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${
                  format === EXPORT_FORMAT.PDF ? "border-primary" : ""
                }`}
                style={{ width: "32%" }}
                onClick={() => setFormat(EXPORT_FORMAT.PDF)}
              >
                <div className="d-flex gap-2 flex-column justify-content-center align-items-center">
                  <Icon icon="teenyicons:pdf-outline" width={20} height={20} />
                  <span>{EXPORT_LABEL.PDF}</span>
                </div>
                <p className="text-center m-0 text-muted">Print-ready (.pdf)</p>
              </div>

              {/* Excel */}
              <div
                className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${
                  format === EXPORT_FORMAT.EXCEL ? "border-primary" : ""
                }`}
                style={{ width: "32%" }}
                onClick={() => setFormat(EXPORT_FORMAT.EXCEL)}
              >
                <div className="d-flex gap-2 flex-column justify-content-center align-items-center">
                  <Icon
                    icon="teenyicons:ms-excel-outline"
                    width={20}
                    height={20}
                  />
                  <span>Excel</span>
                </div>
                <p className="text-center m-0 text-muted">Workbook (.xlsx)</p>
              </div>

              {/* CSV */}
              <div
                className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${
                  format === EXPORT_FORMAT.CSV ? "border-primary" : ""
                }`}
                style={{ width: "32%" }}
                onClick={() => setFormat(EXPORT_FORMAT.CSV)}
              >
                <div className="d-flex gap-2 flex-column justify-content-center align-items-center">
                  <Icon icon="teenyicons:csv-outline" width={20} height={20} />
                  <span className="fw-bold">{EXPORT_LABEL.CSV}</span>
                </div>
                <p className="text-center m-0 text-muted">Raw data (.csv)</p>
              </div>
            </div>
          </div>

          {/* Column Selection */}
          <div className="d-flex flex-column gap-2">
            <span className="fw-bold">Columns</span>
            <div className="d-flex flex-column gap-3">
              <input
                type="search"
                className="font-size-sm form-control"
                placeholder="Search columns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="d-flex flex-column gap-2">
                {filteredColumns.map((column) => {
                  const isChecked = selectedColumns.some(
                    (col) => col.field === column.field,
                  );
                  return (
                    <div
                      key={column.field}
                      className="d-flex flex-row align-items-center gap-2 border rounded-2 p-2 pointer-cursor"
                      onClick={() =>
                        setSelectedColumns((prev) =>
                          isChecked
                            ? prev.filter((col) => col.field !== column.field)
                            : [...prev, column],
                        )
                      }
                    >
                      <Form.Check
                        type="checkbox"
                        id={`checkbox-${column.field}`}
                        checked={isChecked}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{column.headerName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drag and Drop Column Reordering */}
          <div className="d-flex flex-column gap-2">
            <span className="fw-bold">Reorder Columns</span>
            <div className="d-flex flex-column gap-2">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedColumns.map((col) => col.field)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedColumns.map((column) => (
                    <SortableColumnItem key={column.field} column={column} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{ width: "0.05rem", height: "75dvh", background: "#dadada" }}
        />

        {/* Right Column Preview */}
        <div
          style={{ width: "50%", maxHeight: "70dvh", height: "auto" }}
          className="d-flex flex-column justify-content-start"
        >
          <span className="text-center fw-bold mb-2">Live Preview</span>

          {/* PDF Preview */}
          {format === EXPORT_FORMAT.PDF && (
            <div className="pdf-preview-doc p-2">
              <div className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-3">
                <div>
                  <div className="fw-semibold">{title}</div>
                  <small className="text-muted">
                    Generated · {new Date().toLocaleDateString()}
                  </small>
                </div>
                <span className="badge primary-background">PDF</span>
              </div>
              <div
                className="border rounded font-size-sm overflow-auto width-auto"
                style={{ width: "99%" }}
              >
                <table
                  className="table table-sm table-striped font-size-sm mb-0"
                  style={{
                    fontFamily: "monospace",
                    width: "100%",
                    whiteSpace: "nowrap",
                  }}
                >
                  <thead className="table-light" style={{ height: "2rem" }}>
                    <tr>
                      {selectedColumns.map((col) => (
                        <th key={col.field} className="font-size-sm">
                          {col.headerName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getPreviewRows()
                      .slice(0, 10)
                      .map((row, i) => (
                        <tr key={i}>
                          {selectedColumns.map((col) => (
                            <td key={col.field}>{row[col.field] ?? "—"}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <small className="text-muted">
                  Confidential — Internal Use
                </small>
                <small className="text-muted">
                  Page 1 of {Math.ceil(getPreviewRows().length / 50) || 1}
                </small>
              </div>
            </div>
          )}

          {/* Excel Preview */}
          {format === EXPORT_FORMAT.EXCEL && (
            <div
              className="border rounded font-size-sm overflow-auto width-auto"
              style={{ width: "99%" }}
            >
              <table
                className="table table-bordered table-sm mb-0"
                style={{ fontFamily: "monospace" }}
              >
                <thead>
                  <tr className="table-success">
                    {selectedColumns.map((col) => (
                      <th key={col.field} className="fw-semibold font-size-sm">
                        {col.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getPreviewRows()
                    .slice(0, 3)
                    .map((row, i) => (
                      <tr key={i}>
                        {selectedColumns.map((col) => (
                          <td key={col.field}>{row[col.field] ?? ""}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CSV Preview */}
          {format === EXPORT_FORMAT.CSV && (
            <pre
              className="rounded p-3 font-size-sm"
              style={{ background: "#1e1e1e", color: "#d4d4d4" }}
            >
              <code>
                {selectedColumns.map((c) => c.field).join(",") + "\n"}
                {getPreviewRows()
                  .slice(0, 3)
                  .map((row) =>
                    selectedColumns.map((c) => row[c.field] ?? "").join(","),
                  )
                  .join("\n")}
                {"\n..."}
              </code>
            </pre>
          )}
        </div>
      </div>

      <div className="d-flex flex-row align-items-center gap-2 mt-3">
        <button
          onClick={handleClose}
          className="border-none p-2 rounded-pill bg-transparent font-size-sm w-50 border"
        >
          Cancel
        </button>
        <button
          className="border-none p-2 rounded-pill primary-background text-white font-size-sm w-50"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default Export;
