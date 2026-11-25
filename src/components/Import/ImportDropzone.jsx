import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, FileSpreadsheet, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { SingleSpinner } from "../Spinners/Spinners";

/**
 * File picker for imports: the whole area is one large target (click, drop
 * or Enter/Space), and it always shows where things stand — waiting,
 * reading, the chosen file, or why the file was refused and what to do.
 *
 *   <ImportDropzone status file={sheet?.info} error={fileError}
 *                   onFile={chooseFile} onClear={clearFile} />
 */
export default function ImportDropzone({ status, file, error, onFile, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const busy = status === "reading";

  const open = () => {
    if (busy) return;
    // Reset so choosing the same file again still triggers onChange.
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.click();
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (busy) return;
    const dropped = event.dataTransfer?.files?.[0];
    if (dropped) onFile(dropped);
  };

  if (status === "ready" && file) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex flex-row align-items-center gap-3 p-3 border rounded-4 bg-white"
      >
        <div className="d-grid rounded-3 bg-fern-50 text-fern-600 flex-shrink-0" style={{ width: "2.75rem", height: "2.75rem", placeItems: "center" }}>
          <FileSpreadsheet size={20} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate" title={file.name}>{file.name}</span>
          <span className="text-iron-500 font-size-xs">
            {file.size} · {file.rows.toLocaleString()} {file.rows === 1 ? "row" : "rows"} ready to check
          </span>
        </div>
        <button type="button" onClick={open} className="border rounded-3 bg-white px-2 py-1 font-size-sm d-flex flex-row align-items-center gap-1">
          <RefreshCw size={14} /> Replace
        </button>
        <button type="button" onClick={onClear} className="border rounded-3 bg-white p-1 d-grid text-red-600" style={{ width: "2rem", height: "2rem", placeItems: "center" }} aria-label="Remove file">
          <Trash2 size={14} />
        </button>
        <HiddenInput inputRef={inputRef} onFile={onFile} />
      </motion.div>
    );
  }

  const stateClass = dragging
    ? "import-dropzone--dragging"
    : status === "error"
      ? "import-dropzone--error"
      : busy
        ? "import-dropzone--busy"
        : "";

  return (
    <div
      role="button"
      tabIndex={busy ? -1 : 0}
      aria-busy={busy}
      aria-label="Choose a CSV or Excel file to import"
      className={`import-dropzone d-flex flex-column align-items-center justify-content-center text-center gap-2 p-4 ${stateClass}`}
      style={{ minHeight: "12.5rem" }}
      onClick={open}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!busy) setDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
      }}
      onDrop={onDrop}
    >
      <AnimatePresence mode="wait" initial={false}>
        {busy ? (
          <motion.div key="busy" className="d-flex flex-column align-items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SingleSpinner classColor="text-primary-500" />
            <span className="fw-medium">Reading your file…</span>
            <span className="text-iron-500 font-size-xs">Checking its columns and counting its rows.</span>
          </motion.div>
        ) : status === "error" && error ? (
          <motion.div key="error" className="d-flex flex-column align-items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert">
            <CircleAlert size={26} className="text-red-500" />
            <span className="fw-semibold text-red-700">{error.title}</span>
            <span className="text-iron-600 font-size-sm" style={{ maxWidth: "26rem" }}>{error.description}</span>
            <span className="text-primary-600 fw-medium font-size-sm mt-1">Choose another file</span>
          </motion.div>
        ) : (
          <motion.div key="idle" className="d-flex flex-column align-items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div animate={{ y: dragging ? -4 : 0 }} className={dragging ? "text-primary-500" : "text-iron-500"}>
              <UploadCloud size={30} />
            </motion.div>
            <span className="fw-semibold">{dragging ? "Drop the file to use it" : "Drag your file here, or click to choose"}</span>
            <span className="text-iron-500 font-size-xs">CSV, XLSX or XLS · up to 10 MB · up to 5,000 rows</span>
          </motion.div>
        )}
      </AnimatePresence>
      <HiddenInput inputRef={inputRef} onFile={onFile} />
    </div>
  );
}

function HiddenInput({ inputRef, onFile }) {
  return (
    <input
      ref={inputRef}
      type="file"
      accept=".csv,.xlsx,.xls,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      className="d-none"
      tabIndex={-1}
      onClick={(event) => event.stopPropagation()}
      onChange={(event) => {
        const chosen = event.target.files?.[0];
        if (chosen) onFile(chosen);
      }}
    />
  );
}
