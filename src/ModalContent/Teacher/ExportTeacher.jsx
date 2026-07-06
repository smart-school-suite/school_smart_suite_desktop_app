import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PdfGenerator from "../../services/export/generators/pdf";
import toast from "react-hot-toast";
import ExportGenerationService from "../../services/export/ExportGenerationService";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";

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
      className={`card rounded-2 p-2 w-100 ${isDragging ? "border-primary" : ""}`}
    >
      <div className="d-flex flex-row align-items-center gap-1">
        <span
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }}
          className="d-flex align-items-center"
        >
          <Icon
            icon="codex:menu"
            width={20}
            height={20}
            className="text-muted"
          />
        </span>
        <span className="ms-1">{column.headerName}</span>
      </div>
    </div>
  );
}

function ExportTeacher({ handleClose, rowData }) {
  const selectedRows = rowData.tableRef.current.getSelectedRows();
  const currentPageRows = rowData.tableRef.current.getCurrentPageRows();
  const allTableData = rowData.tableRef.current.getAllTableData();
  const columns = [
    { headerName: "Full Name", field: "name" },
    { headerName: "Username", field: "username" },
    { headerName: "Email", field: "email" },
    { headerName: "Assigned Specialties", field: "num_assigned_specialties" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Phone", field: "phone" },
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
  ];

  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [scope, setScope] = useState("all");
  const [format, setFormat] = useState("pdf");

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
    return allTableData;
  };

  const handleGenerate = async () => {
    const payload = {
      format,

      title: "Teacher Records",

      subtitle: "Teacher Export",

      fileName: "teachers",

      columns: selectedColumns.map((column) => ({
        field: column.field,
        header: column.headerName,
      })),

      rows: getPreviewRows(),
    };

    const result = await ExportGenerationService.generate(payload);
    if (result.success) {
      toast.custom(
        <ToastSuccess
          title={"Generation Successfull"}
          description={"Teacher Generated and stored successfully"}
        />,
      );
    } else if (!result.cancelled) {
      toast.custom(
        <ToastWarning
          title={"Generation Failed"}
          description={"An error occurred while generating the export."}
        />,
      );
    }
  };
  return (
    <>
      <div className="d-flex flex-column font-size-sm">
        <div className="d-flex flex-row align-items-center justify-content-between px-1">
          <span className="fw-bold">Export Teachers</span>
          <button
            onClick={() => handleClose()}
            className="border-none bg-transparent"
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </button>
        </div>
        <div className="d-flex flex-row align-items-start w-100 gap-2">
          <div
            style={{ width: "50%", maxHeight: "70dvh" }}
            className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-3 over-flow-y-auto height-auto px-1"
          >
            <div>
              <div>
                <span className="fw-bold">Export Scope</span>
                <p className="text-muted">
                  Select which records should be included in this export.
                </p>
              </div>
              <div className="d-flex flex-column gap-2">
                <div
                  className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${scope === "all" ? "border-primary" : ""}`}
                  onClick={() => setScope("all")}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold">All Records</span>
                    <span>{allTableData.length} rows </span>
                  </div>
                  <div>
                    <p className="m-0">
                      Export every record matching the current filters.
                    </p>
                  </div>
                </div>
                <div
                  className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${scope === "current" ? "border-primary" : ""}`}
                  onClick={() => setScope("current")}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold">Current Page</span>
                    <span>{currentPageRows.length} rows </span>
                  </div>
                  <div>
                    <p className="m-0">
                      Export only the records visible on this page.
                    </p>
                  </div>
                </div>
                <div
                  className={`card p-2 d-flex flex-column gap-4 rounded-4 pointer-cursor ${scope === "selected" ? "border-primary" : ""}`}
                  onClick={() => setScope("selected")}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold">Selected Rows </span>
                    <span>{selectedRows.length} selected</span>
                  </div>
                  <div>
                    <p className="m-0">
                      Export only the rows you've selected in the table.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <span className="fw-bold">Format</span>
              <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                <div
                  className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${format === "pdf" ? "border-primary" : ""}`}
                  style={{ width: "32%" }}
                  onClick={() => setFormat("pdf")}
                >
                  <div className="d-flex gap-2 flex-column justify-content-center align-items-center ">
                    <span>
                      <Icon
                        icon="teenyicons:pdf-outline"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span>PDF</span>
                  </div>
                  <div>
                    <p className="text-center m-0">Print-ready report (.pdf)</p>
                  </div>
                </div>
                <div
                  className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${format === "xlsx" ? "border-primary" : ""}`}
                  style={{ width: "32%" }}
                  onClick={() => setFormat("xlsx")}
                >
                  <div className="d-flex gap-2 flex-column justify-content-center align-items-center">
                    <span>
                      <Icon
                        icon="teenyicons:ms-excel-outline"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span>Excel</span>
                  </div>
                  <div>
                    <p className="text-center m-0">Editable workbook (.xlsx)</p>
                  </div>
                </div>
                <div
                  className={`card p-2 rounded-4 d-flex flex-column gap-2 pointer-cursor ${format === "csv" ? "border-primary" : ""}`}
                  style={{ width: "32%" }}
                  onClick={() => setFormat("csv")}
                >
                  <div className="d-flex gap-2 flex-column justify-content-center align-items-center">
                    <span>
                      <Icon
                        icon="teenyicons:csv-outline"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="fw-bold">CSV</span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <p className="text-center m-0">Raw data file</p>
                    <span> (.csv) </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <span className="fw-bold">Columns</span>
              <div className="d-flex flex-column gap-4">
                <input
                  type="search"
                  className="font-size-sm form-control"
                  placeholder="search columns"
                />
                <div className="d-flex flex-column gap-4">
                  {columns.map((column, index) => {
                    const isChecked = selectedColumns.some(
                      (selectedColumn) => selectedColumn.field === column.field,
                    );
                    return (
                      <Fragment key={index}>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <Form.Check
                            type="checkbox"
                            id={`checkbox-${column.field}`}
                            checked={isChecked}
                            onChange={() =>
                              setSelectedColumns((prevSelectedColumns) => {
                                if (isChecked) {
                                  return prevSelectedColumns.filter(
                                    (selectedColumn) =>
                                      selectedColumn.field !== column.field,
                                  );
                                } else {
                                  return [...prevSelectedColumns, column];
                                }
                              })
                            }
                          />
                          <span>{column.headerName}</span>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Reorder Section integrated with DndContext and SortableContext */}
            <div className="d-flex flex-column gap-2">
              <span className="fw-bold">Reorder Columns</span>
              <div className="d-flex flex-column gap-3">
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
          <div
            style={{ width: "0.05rem", height: "75dvh", background: "#dadada" }}
          ></div>
          <div
            style={{ width: "50%", maxHeight: "70dvh", height: "auto" }}
            className="d-flex flex-column justify-content-start"
          >
            <span className="text-center fw-bold">Live Preview</span>
            {format === "pdf" && (
              <div className="pdf-preview-doc p-2">
                <div className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-3">
                  <div>
                    <div className="fw-semibold ">Teacher Records</div>
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
                    className="table table-sm table-striped font-size-sm"
                    style={{
                      fontFamily: "monospace",
                      width: "100%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <thead className="table-light" style={{ height:"2rem" }}>
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
                    Confidential — internal use only
                  </small>
                  <small className="text-muted">
                    Page 1 of {Math.ceil(getPreviewRows().length / 50)}
                  </small>
                </div>
              </div>
            )}
            {format === "xlsx" && (
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
                        <th
                          key={col.field}
                          className="fw-semibold font-size-sm"
                        >
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
            {format === "csv" && (
              <pre
                className="rounded p-3 font-size-sm"
                style={{ background: "#1e1e1e", color: "#d4d4d4" }}
              >
                <code>
                  {/* Header row */}
                  {selectedColumns.map((c) => c.field).join(",") + "\n"}
                  {/* Data rows */}
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
            onClick={() => handleClose()}
            className="border-none p-2 rounded-pill bg-transparent font-size-sm w-50 border"
          >
            Cancel
          </button>
          <button
            className="border-none p-2 rounded-pill primary-background text-white font-size-sm w-50"
            onClick={() => handleGenerate()}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default ExportTeacher;
