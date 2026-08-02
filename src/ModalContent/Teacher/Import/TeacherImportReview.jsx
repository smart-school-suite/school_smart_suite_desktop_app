import { Icon } from "@iconify/react";
import Table from "../../../components/Tables/Tables";
import { teacherImportColDefs } from "../../../utils/table/colDefs/teachers/teacherImportColdefs";
import { useRef, useMemo, useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  readSpreadsheetData,
  categorizeImportData,
} from "../../../utils/file/fileParser";
import { reconstructFileFromRedux } from "../../../utils/file/fileReconstruction";
import { TEACHER_COLUMNS } from "../../../utils/teacher/teacherColumns";
import { useImportTeacher } from "../../../hooks/teacher/useImportTeacher";
function TeacherImportReview({
  handleClose,
  nextStep,
  previousStep,
  currentStep,
  fullStep,
}) {
  const [fileData, setFileData] = useState([]);
  const {
    mutate: importTeachers,
    isPending,
    isError,
    error,
  } = useImportTeacher();
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const tableRef = useRef();
  const teacherState = useSelector((state) => state.teachers);
  const mapping = teacherState.import.mapping;
  const file = useMemo(() => {
    const serializedFile = teacherState?.import?.selectedFile?.serializedFile;
    if (!serializedFile) return null;
    try {
      return reconstructFileFromRedux(serializedFile);
    } catch (error) {
      console.error("Failed to reconstruct file:", error);
      return null;
    }
  }, [teacherState?.import?.selectedFile?.serializedFile]);
  useEffect(() => {
    const loadFileData = async () => {
      if (!file) return;

      try {
        const data = await readSpreadsheetData(file, mapping);
        setFileData(data);
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    };

    loadFileData();
  }, [file]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const categorizeData = categorizeImportData(TEACHER_COLUMNS, fileData);

  const FILTERS = [
    {
      label: "All",
      key: "all",
    },
    {
      label: "Ready",
      key: "ready",
    },
    {
      label: "warnings",
      key: "warnings",
    },
    {
      label: "errors",
      key: "errors",
    },
  ];

  const handleTeacherImport = () => {
    importTeachers({
      file: file, 
      map: mapping,
    });
  };
  return (
    <>
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
          <span className="fw-medium">Review teacher data </span>
          <p className="text-muted m-0">
            Check your data and resolve any issues before importing.
          </p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>rows</span>
            <span className="fw-bold">{fileData?.length || 0}</span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span> Ready</span>
            <span className="fw-bold">
              {categorizeData?.ready?.length || 0}
            </span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>errors</span>
            <span className="fw-bold">
              {categorizeData?.errors?.length || 0}
            </span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>Warnings</span>
            <span className="fw-bold">
              {categorizeData?.warnings?.length || 0}
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              {FILTERS.map((f) => (
                <Fragment>
                  <button
                    className={`font-size-sm border-none border text-capitalize  px-2 py-1 rounded-3 transition-all ${filter === f.key ? "primary-background-200 color-primary" : "bg-transparent"}`}
                    onClick={() => {
                      setFilter(f.key);
                    }}
                  >
                    {f.label} 126
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
              colDefs={teacherImportColDefs()}
              rowData={fileData}
              ref={tableRef}
            />
          </div>
        </div>
        <div className="mt-auto">
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
              onClick={() => handleTeacherImport()}
            >
              Import 118 teachers
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherImportReview;
