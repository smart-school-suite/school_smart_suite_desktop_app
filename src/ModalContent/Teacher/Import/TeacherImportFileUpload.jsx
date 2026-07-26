import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { countSpreadsheetRows } from "../../../utils/file/fileParser";
import {
  setImportSelectedFile,
  setImportStatus,
  setImportReset,
} from "../../../Slices/teacher/teacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { prepareFileForRedux } from "../../../utils/file/fileReconstruction";
import {  FILE_ENCODING } from "@/constants";
function FileUpload({ onFileSelect, fileInfo, onClearFile }) {
  const dispatch = useDispatch();
  const [dragActive, setDragActive] = useState(false);
  const status = useSelector((state) => state.teachers.import.status);
  const fileInputRef = useRef(null);

  const dashLength = 8;
  const gapLength = 6;
  const strokeWidth = 1.5;

  const processFile = async (file) => {
    if (!file) return;

    const validExtensions = ["csv", "xlsx", "xls"];
    const fileExt = file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      alert("Please upload a CSV or XLSX file.");
      return;
    }

    dispatch(setImportStatus({ status: "READING" }));

    try {
      const rowCount = await countSpreadsheetRows(file);

      const formattedSize =
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
          : Math.round(file.size / 1024) + " KB";

      const serializedFile = await prepareFileForRedux(
        file,
        rowCount,
        FILE_ENCODING.ARRAY_BUFFER,
      );

      dispatch(setImportStatus({ status: "READY" }));
      if (onFileSelect) {
        onFileSelect({
          name: file.name,
          size: formattedSize,
          rows: rowCount,
          serializedFile
        });
      }
    } catch (error) {
      console.error("Error parsing spreadsheet:", error);
      alert(
        "Could not read file. Please ensure it's a valid CSV or Excel document.",
      );
      dispatch(setImportStatus({ status: "IDLE" }));
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    dispatch(setImportStatus({ status: "IDLE" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onClearFile) onClearFile();
  };

  const getBorderColor = () => {
    if (dragActive || status === "READY") return "#0ea7e9";
    return "#333333";
  };

  React.useEffect(() => {
    if (!fileInfo && status === "READY") {
      dispatch(setImportStatus({ status: "IDLE" }));
    }
  }, [fileInfo, status]);

  return (
    <motion.div
      onClick={() => status === "IDLE" && fileInputRef.current?.click()}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        width: "100%",
        height: "28dvh",
        minHeight: "180px",
        position: "relative",
        cursor: status === "IDLE" ? "pointer" : "default",
        overflow: "hidden",
      }}
      className="rounded-4 d-flex flex-column align-items-center justify-content-center p-3"
      initial="IDLE"
      whileHover={status === "IDLE" ? "HOVER" : ""}
      animate={dragActive ? "DRAG_ACTIVE" : status}
      variants={{
        IDLE: {
          y: 0,
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.02)",
        },
        HOVER: {
          y: -2,
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0px 8px 20px rgba(13, 110, 253, 0.12)",
        },
        DRAG_ACTIVE: {
          y: 0,
          backgroundColor: "#f0f7ff",
          boxShadow: "0px 8px 24px rgba(13, 110, 253, 0.18)",
        },
        READING: { y: 0, backgroundColor: "rgba(255, 255, 255, 1)" },
        READY: { y: 0, backgroundColor: "#f8fdf9" },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <motion.rect
          x="1"
          y="1"
          width="99.5%"
          height="99.5%"
          rx="16"
          ry="16"
          fill="none"
          stroke={getBorderColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashLength} ${gapLength}`}
          animate={{ stroke: getBorderColor() }}
          transition={{ duration: 0.2 }}
        />
      </svg>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .xlsx, .xls"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {(status === "IDLE" || dragActive) && (
          <motion.div
            key="idle-state"
            className="d-flex align-items-center flex-column gap-3 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated Icon */}
            <motion.span
              variants={{
                IDLE: { y: 0, color: "#212529" },
                HOVER: { y: -3, color: "#0ea7e9" },
                DRAG_ACTIVE: {
                  y: [0, -6, 0],
                  color: "#0ea7e9",
                  transition: { repeat: 1, duration: 0.35 },
                },
              }}
            >
              <Icon icon="solar:file-linear" width={28} height={28} />
            </motion.span>

            <div className="d-flex flex-column gap-1 text-center">
              <span className="fw-medium">
                {dragActive ? "Drop to upload" : "Drop your file here"}
              </span>
              {!dragActive && (
                <span className="text-muted small">
                  or click to browse your computer
                </span>
              )}
            </div>

            {!dragActive && (
              <div className="d-flex flex-row align-items-center gap-2 justify-content-center text-muted small">
                <span>CSV, XLSX</span>
                <Icon icon="icon-park-outline:dot" />
                <span>Max 10 MB</span>
              </div>
            )}
          </motion.div>
        )}

        {/* STATE 2: READING */}
        {status === "READING" && (
          <motion.div
            key="reading-state"
            className="d-flex align-items-center flex-column gap-2 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              style={{ display: "inline-block", color: "#0ea7e9" }}
            >
              <Icon icon="solar:spinner-single-bold" width={28} height={28} />
            </motion.div>
            <span className="fw-medium text-secondary">
              Reading spreadsheet...
            </span>
          </motion.div>
        )}

        {/* STATE 3: FILE READY */}
        {status === "READY" && fileInfo && (
          <motion.div
            key="ready-state"
            className="d-flex align-items-center flex-column gap-2 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.span
              style={{ color: "#198754" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: 0.05,
              }}
            >
              <Icon icon="solar:check-circle-bold" width={36} height={36} />
            </motion.span>

            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold text-dark">{fileInfo.name}</span>
              <span className="text-muted small">{fileInfo.size}</span>
            </div>

            <button
              onClick={handleReset}
              className="btn btn-link btn-sm text-danger text-decoration-none mt-1 p-0"
            >
              Replace file
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TeacherImportFileUpload({
  handleClose,
  nextStep,
  previousStep,
  currentStep,
  fullStep,
}) {
  const dispatch = useDispatch();
  const selectedFile = useSelector(
    (state) => state.teachers.import.selectedFile,
  );

  return (
    <div className="d-flex flex-column font-size-sm gap-4">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="fw-semibold">Import Teacher</span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleClose && handleClose()}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <span>
          {currentStep} of {fullStep} completed
        </span>
      </div>
      <div>
        <span className="fw-medium">Upload teacher data</span>
        <p className="text-muted m-0">
          Import teachers from an Excel or CSV file. We'll check your data
          before anything is added.
        </p>
      </div>

      <FileUpload
        onFileSelect={(fileData) =>
          dispatch(setImportSelectedFile({ selectedFile: fileData }))
        }
        fileInfo={selectedFile}
        onClearFile={() => dispatch(setImportReset())}
      />

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="d-flex flex-row align-items-center justify-content-between card p-2 rounded-4"
          >
            <div className="d-flex flex-row align-items-center gap-2">
              <div>
                <Icon icon="solar:file-linear" width={20} height={20} />
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">{selectedFile.name}</span>
                <div className="d-flex flex-row align-items-center gap-2 text-muted small">
                  <span>{selectedFile.size}</span>
                  <Icon icon="icon-park-outline:dot" />
                  <span>{selectedFile.rows} Rows</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch(setImportReset())}
              className="border-none border rounded-circle bg-transparent p-0"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <Icon icon="icons8:cancel" width={18} height={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="d-flex flex-column gap-2">
        <span className="fw-medium">New to teacher imports?</span>
        <button className="font-size-sm border-none rounded-3 p-2 d-flex flex-row align-items-center gap-2 w-100 justify-content-center bg-light">
          <span>Download template</span>
          <Icon icon="mynaui:download" width={20} height={20} />
        </button>
        <span className="font-size-sm text-muted">
          Use our template to make sure your columns are formatted correctly.
        </span>
      </div>

      <div className="mt-auto">
        <div className="d-flex flex-row justify-content-end">
          <button
            disabled={!selectedFile}
            className={`border-none rounded-3 px-3 py-2 border  text-white ${
              selectedFile
                ? "primary-background"
                : "bg-secondary border-secondary opacity-50"
            }`}
            onClick={() => nextStep()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherImportFileUpload;
