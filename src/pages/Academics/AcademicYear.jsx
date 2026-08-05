import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import { useSelector } from "react-redux";
import Table from "../../components/Tables/Tables";
import React, { useMemo, useState, useRef, useEffect, Fragment, useCallback } from "react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { academicYearTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { AcademicYearIcon } from "../../icons/Icons";
import AcademicYearDetails from "../../ModalContent/AcademicYear/AcademicYearDetails";
import CreateAcademicYear from "../../ModalContent/AcademicYear/CreateAcademicYear";
import DeleteAcademicYear from "../../ModalContent/AcademicYear/DeleteAcademicYear";
import UpdateAcademicYear from "../../ModalContent/AcademicYear/UpdateAcademicYear";
import { Icon } from "@iconify/react";
import JobPopOver from "../../components/Popover/JobPopover";
import { isLastElement } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import filterPopOverMap from "../../utils/maps/FilterMap";
import FilterColumns from "../../ModalContent/Teacher/FilterColumns";
import {
  resetAllCustomFilters,
  addCustomFilter,
  toggleGeneralFilter,
  removeCustomFilter,
  setCustomFilter,
} from "../../Slices/academics/academicYearSlice";
import GeneralFilterWizzard from "../../components/GeneralFilter/Table/GeneralFilterWizzard";
import { semesterColDefs } from "../../utils/table/colDefs/semester/semesterColDefs";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import Export from "../../ModalContent/Export/Export";
import { academicYearColDefs } from "../../utils/table/colDefs/academicYear/academicYearColDefs";
function AcademicYear() {
  const {
    data: schoolAcademicYears,
    isLoading,
    error,
  } = useGetSchoolAcademicYears();
  const tableRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const academicYearState = useSelector((state) => state.academicYear);
  const [searchText, setSearchText] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [selectedAcademicYears, setSelectedAcademicYears] = useState([]);
  const [columns, setColumns] = useState({
    selectedColumns: [],
    availableColumns: [],
  });
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAcademicYears([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAcademicYears(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return academicYearColDefs({
      ActionComponent
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return schoolAcademicYears?.data ?? [];
  }, [schoolAcademicYears]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAcademicYears([]);

      if (tableRef.current.setGridOption) {
        tableRef.current.setGridOption("quickFilterText", "");
      }
      setSearchText("");
      const gridApi = tableRef.current.getGridApi
        ? tableRef.current.getGridApi()
        : null;
      if (gridApi) {
        gridApi.setFilterModel(null);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && tableRef.current?.getColumnsState) {
      const timer = setTimeout(() => {
        const gridCols = tableRef.current.getColumnsState();
        if (gridCols && gridCols.length > 0) {
          const filteredCols = gridCols.filter(
            (col) =>
              !col.isSystemColumn &&
              col.field !== "action" &&
              col.colId !== "actions" &&
              col.colId !== "ActionComponent",
          );
          setColumns((prevalue) => ({
            ...prevalue,
            availableColumns: [...prevalue.availableColumns, ...filteredCols],
          }));
          setColumns((prev) => ({
            ...prev,
            selectedColumns: prev.availableColumns.slice(0, 4),
          }));
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, memoizedRowData]);
  return (
    <>
      <main className="main-container gap-2">
        {isLoading ? (
          <RectangleSkeleton width="100%" height="100%" speed={0.5} />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
            <div className="d-flex flex-column gap-3 h-100">
              <div className="d-flex flex-row align-items-center justify-content-between bg-white p-2 border rounded-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className={`${
                      darkMode ? "dark-mode-active" : "light-mode-active"
                    } d-flex justify-content-center align-items-center`}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <AcademicYearIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Academic Year
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver />
                  <ModalButton
                    classname={
                      "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                    }
                  >
                    <span style={{ lineHeight: "16px" }}>Import</span>
                    <ArrowDown size={16} />
                  </ModalButton>
                  <ModalButton
                    classname={
                      "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                    }
                  >
                    <span style={{ lineHeight: "16px" }}>Actions</span>
                    <ChevronDown size={16} />
                  </ModalButton>
                  <ModalButton
                    action={{ modalContent: CreateAcademicYear }}
                    size={"lg"}
                    classname={
                      "border-none border rounded-3 font-size-sm  primary-background px-2 text-white text-capitalize"
                    }
                    style={{ padding: "0.4rem" }}
                  >
                    <span>Create Academic Year</span>
                  </ModalButton>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    {columns?.selectedColumns?.map((c, index) => {
                      const FilterPopOver = filterPopOverMap.find(
                        (f) => f.cellDataType === c.cellDataType,
                      ).component;
                      return (
                        <Fragment key={index}>
                          <FilterPopOver column={c} tableRef={tableRef} />
                        </Fragment>
                      );
                    })}
                    <ModalButton
                      action={{ modalContent: FilterColumns }}
                      size={"xl"}
                      rowData={{ setColumns, columns: columns }}
                    >
                      <button
                        className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span>
                          <Icon icon="ic:round-plus" width={14} height={14} />
                        </span>
                      </button>
                    </ModalButton>
                    <button
                      className="border-none border rounded-3 font-size-sm  d-flex flex-row align-items-center gap-2 white-bg"
                      style={{
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        padding: "0.45rem",
                      }}
                      onClick={() => {
                        dispatch(toggleGeneralFilter());
                      }}
                    >
                      <span>
                        <Icon icon="mynaui:filter" width={16} height={16} />
                      </span>
                      <span style={{ lineHeight: "16px" }}>Filter</span>
                    </button>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button
                      className="border-none border rounded-3 font-size-sm   d-flex flex-row align-items-center white-bg"
                      onClick={handleReset}
                      style={{ padding: "0.45rem" }}
                    >
                      <span>
                        <Icon
                          icon="grommet-icons:revert"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm d-flex flex-row align-items-center white-bg"
                      style={{ padding: "0.45rem" }}
                    >
                      <span>
                        <Icon icon="mage:copy" width={16} height={16} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <input
                    type="search"
                    placeholder="Search Specialty"
                    onChange={handleSearch}
                    value={searchText}
                    className="font-size-sm form-control w-25"
                  />
                  <div className="d-flex flex-row align-items-center gap-2">
                    <ModalButton
                      action={{ modalContent: Export }}
                      size={"xl"}
                      rowData={{ tableRef, columns: columns.availableColumns }}
                    >
                      <button
                        className="border-none border rounded-3 font-size-sm px-2 d-flex flex-row align-items-center gap-1 white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span style={{ lineHeight: "16px" }}>Export</span>
                        <span>
                          <Icon icon="tabler:arrow-up" width={14} height={14} />
                        </span>
                      </button>
                    </ModalButton>
                    <ModalButton
                      action={{ modalContent: TableColumnSetting }}
                      size={"xl"}
                      rowData={{ tableRef }}
                    >
                      <button
                        className="border-none border rounded-3 font-size-sm px-2 d-flex flex-row align-items-center gap-1 white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span>
                          <Icon
                            icon="lsicon:setting-outline"
                            width={20}
                            height={20}
                          />
                        </span>
                      </button>
                    </ModalButton>
                  </div>
                </div>
              </div>
              <div className="h-100">
                <div className="d-flex flex-row align-items-start w-100 h-100 gap-1">
                  <motion.div
                    className="h-100"
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      width: academicYearState.isGeneralFilterOpen
                        ? "60%"
                        : "100%",
                    }}
                  >
                    <Table
                      colDefs={memoizedColDefs}
                      rowData={memoizedRowData}
                      ref={tableRef}
                      handleRowCountFromChild={handleRowCountFromChild}
                      handleRowDataFromChild={handleRowDataFromChild}
                    />
                  </motion.div>
                  {academicYearState.isGeneralFilterOpen && (
                    <AnimatePresence mode="popLayout">
                      {academicYearState.isGeneralFilterOpen && (
                        <motion.div
                          key="filter-panel"
                          className="card rounded-3 font-size-sm d-flex flex-column h-100"
                          initial={{ x: "100%", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: "100%", opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 32,
                          }}
                          style={{ width: "40%" }}
                        >
                          <div
                            className="p-2 rounded-top-3 d-flex flex-column gap-2 border-bottom"
                            style={{ background: "#f9f9f9" }}
                          >
                            <div className="d-flex flex-row align-items-center justify-content-between">
                              <span>
                                Build a custom view of your academic year data.
                              </span>
                              <button
                                className="border-none bg-transparent"
                                onClick={() => dispatch(toggleGeneralFilter())}
                              >
                                <Icon
                                  icon="iconoir:cancel"
                                  width={18}
                                  height={18}
                                />
                              </button>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                              <div className="d-flex flex-row align-items-center gap-2">
                                <span>
                                  <Icon
                                    icon="mynaui:filter"
                                    width={18}
                                    height={18}
                                  />
                                </span>
                                <span>Filter Teacher</span>
                              </div>
                              <span>{schoolAcademicYears?.data.length} items</span>
                            </div>
                          </div>
                          <div
                            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column me-1 gap-2"
                            style={{ maxHeight: "52dvh" }}
                          >
                            {academicYearState.customFilter.length > 0 ? (
                              <div>
                                {academicYearState?.customFilter?.map(
                                  (cFilters) => (
                                    <Fragment key={cFilters.id}>
                                      <GeneralFilterWizzard
                                        cFilters={cFilters}
                                        columns={columns}
                                        moduleState={academicYearState}
                                        removeCustomFilter={removeCustomFilter}
                                        setCustomFilter={setCustomFilter}
                                      />
                                    </Fragment>
                                  ),
                                )}
                              </div>
                            ) : (
                              <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4">
                                <div className="text-center d-flex flex-column gap-1 mb-3">
                                  <span className="fw-semibold">
                                    Build a custom filter
                                  </span>
                                  <span className="text-muted">
                                    Create one or more conditions to narrow down
                                    your academic year list.
                                  </span>
                                </div>
                                <button
                                  className="d-flex flex-row align-items-center gap-2 bg-transparent border-none border rounded-3 p-2 font-size-sm"
                                  onClick={() => {
                                    dispatch(addCustomFilter());
                                  }}
                                >
                                  <span>
                                    <Icon icon="mynaui:plus" />
                                  </span>
                                  <span>Add Condition</span>
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="mt-auto">
                            {academicYearState.customFilter.length > 0 && (
                              <div className="d-flex flex-row justify-content-start p-2">
                                <button
                                  className="font-size-sm bg-transparent font-size-sm rounded-3 p-2 d-flex flex-row align-items-center gap-2 border-none border"
                                  onClick={() => {
                                    dispatch(addCustomFilter());
                                  }}
                                >
                                  <span>
                                    <Icon icon="ic:round-plus" />
                                  </span>
                                  <span>Add Condition</span>
                                </button>
                              </div>
                            )}
                            <div className="d-flex flex-row border-top justify-content-between p-2">
                              <button
                                className="border-none border bg-transparent px-3 font-size-sm py-2 rounded-3"
                                onClick={() => {
                                  dispatch(resetAllCustomFilters());
                                }}
                              >
                                Reset All
                              </button>
                              <button className="border-none border px-3 font-size-sm py-2 primary-background text-white rounded-3">
                                Apply
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
export default AcademicYear;

export function ActionComponent(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData,
        handleClose: handleCloseModal,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <ActionButtonDropdown
        buttonContent={"Edit Actions"}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateAcademicYear, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Academic Year</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AcademicYearDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Academic Year Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteAcademicYear, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Acadenuc Year</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
      </ActionButtonDropdown>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
