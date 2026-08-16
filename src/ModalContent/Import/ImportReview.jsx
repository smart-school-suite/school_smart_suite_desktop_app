import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import { useRef, useMemo, useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  readAndTransformSpreadsheetData, // Import the new function
  categorizeImportData,
  formatImportMapping,
} from "../../utils/file/fileParser";
import { reconstructFileFromRedux } from "../../utils/file/fileReconstruction";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  CircleX,
  ChevronDown,
  Plus,
  Dot,
  ArrowRight,
  Trash2,
  TriangleAlert,
  Info,
  CircleCheck,
} from "lucide-react";
import { useImportModule } from "../../hooks/import/useImportModule";
import { useImportDepartment } from "../../hooks/department/useImportDepartment";
function ImportReview({
  moduleState: moduleStateType,
  setImportReset,
  moduleColumns,
  module,
  handleClose,
  currentStep,
  fullStep,
  previousStep,
  nextStep,
  importModuleColDefs,
}) {
  const [fileData, setFileData] = useState([]);
  const moduleState = useSelector((state) => state[moduleStateType]);
  const {
    mutate: importModule,
    isPending,
    isError,
    error,
  } = useImportDepartment(moduleStateType, handleClose, setImportReset);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const tableRef = useRef();
  const mapping = moduleState.import.mapping;
  const file = useMemo(() => {
    const serializedFile = moduleState?.import?.selectedFile?.serializedFile;
    if (!serializedFile) return null;
    try {
      return reconstructFileFromRedux(serializedFile);
    } catch (error) {
      console.error("Failed to reconstruct file:", error);
      return null;
    }
  }, [moduleState?.import?.selectedFile?.serializedFile]);

  useEffect(() => {
    const loadFileData = async () => {
      if (!file) return;

      try {
        const data = await readAndTransformSpreadsheetData(file, mapping);
        setFileData(data);
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    };

    loadFileData();
  }, [file, mapping]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const categorizeData = categorizeImportData(moduleColumns, fileData);

  const FILTERS = [
    {
      label: "All",
      key: "all",
      count: fileData?.length,
    },
    {
      label: "Ready",
      key: "ready",
      count: categorizeData?.ready?.length,
    },
    {
      label: "Warnings",
      key: "warnings",
      count: categorizeData?.warnings?.length,
    },
    {
      label: "Errors",
      key: "errors",
      count: categorizeData?.errors?.length,
    },
  ];
  const handleImport = async () => {
    const formattedMapping = formatImportMapping(mapping);
    importModule({
      file: file,
      mapping: formattedMapping,
    });
  };

  return (
    <>
      <div className="d-flex flex-column font-size-sm gap-2">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">Import Review</span>
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
        <div className="px-2 d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-end fw-semibold">
            <span>
              {currentStep} of {fullStep} completed
            </span>
          </div>

          <div>
            <span className="fw-medium">Review {module?.name} data </span>
            <p className="text-muted m-0">
              Check your data and resolve any issues before importing.
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex row align-items-center gap-2 align-items-center text-center">
              <span>rows</span>
              <span className="fw-bold font-size-sm">
                {fileData?.length || 0}
              </span>
            </div>
            <div className="d-flex row align-items-center gap-2 align-items-center text-center">
              <span> Ready</span>
              <span className="fw-bold font-size-sm">
                {categorizeData?.ready?.length || 0}
              </span>
            </div>
            <div className="d-flex row align-items-center gap-2 align-items-center text-center">
              <span>errors</span>
              <span className="fw-bold font-size-sm">
                {categorizeData?.errors?.length || 0}
              </span>
            </div>
            <div className="d-flex row align-items-center gap-2 align-items-center text-center">
              <span>Warnings</span>
              <span className="fw-bold font-size-sm">
                {categorizeData?.warnings?.length || 0}
              </span>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center gap-2">
                {FILTERS.map((f) => (
                  <Fragment key={f.key}>
                    <button
                      className={`font-size-sm border-none border text-capitalize gap-1 z-0 position-relative px-2 rounded-3 transition-all bg-none w-100`}
                      onClick={() => {
                        setFilter(f.key);
                      }}
                      style={{
                        paddingTop: "0.45rem",
                        paddingBottom: "0.45rem",
                      }}
                    >
                      {f.key === filter && (
                        <span
                          className="primary-background rounded-circle position-absolute"
                          style={{
                            width: "0.6em",
                            height: "0.6em",
                            zIndex: 9999,
                            right: "-2%",
                            top: "-2%",
                          }}
                        ></span>
                      )}
                      <div className="d-flex flex-row align-items-center gap-1">
                        <span>{f.label}</span> <span>{f.count}</span>
                      </div>
                    </button>
                  </Fragment>
                ))}
              </div>
              <input
                type="search"
                className="form-control font-size-sm w-25"
                placeholder="Search......."
                onChange={handleSearch}
                value={searchText}
              />
            </div>
            <div style={{ height: "42dvh" }}>
              <Table
                colDefs={importModuleColDefs()}
                rowData={fileData}
                ref={tableRef}
              />
            </div>
          </div>
        </div>
        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <button
              className="border-none bg-transparent d-flex flex-row align-items-center gap-2"
              onClick={() => previousStep()}
            >
              <span style={{ lineHeight: 0 }}>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width={16}
                  height={16}
                />
              </span>
              <span>Back</span>
            </button>
            <button
              className="border-none border primary-background font-size-sm text-white p-2 rounded-3"
              onClick={() => handleImport()}
            >
              {isPending ? (
                <SingleSpinner />
              ) : (
                `Import ${categorizeData?.ready?.length || 0} ${module.name}`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ImportReview;
