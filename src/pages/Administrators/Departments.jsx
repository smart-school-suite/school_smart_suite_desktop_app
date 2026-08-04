import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import DeleteDepartment from "../../ModalContent/Department/DeleteDepartment";
import DepartmentDetails from "../../ModalContent/Department/DepartmentDetails";
import CreateDepartment from "../../ModalContent/Department/CreateDepartment";
import UpdateDepartment from "../../ModalContent/Department/UpdateDepartment";
import DeactivateDepartment from "../../ModalContent/Department/DeactivateDepartment";
import { DepartmentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActivateDepartment from "../../ModalContent/Department/ActivateDepartment";
import React from "react";
import { useState, useRef, useMemo, useCallback, useEffect, Fragment } from "react";
import CustomModal from "../../components/Modals/Modal";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { DepartmentIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import BulkActivateDepartment from "../../ModalContent/Department/BulkActivateDepartment";
import BulkDeactivateDepartment from "../../ModalContent/Department/BulkDeactivateDepartment";
import BulkDeleteDepartment from "../../ModalContent/Department/BulkDeleteDepartment";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { departmentColDefs } from "../../utils/table/colDefs/department/departmentColDefs";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import Export from "../../ModalContent/Export/Export";
import { useChannel } from "ably/react";
import { useGetJobs } from "../../hooks/job/useGetJobs";
import { JOB_STATUS_LABEL, JOB_STATUS } from "@/constants";
import { jobProgressMap } from "../../utils/maps/jobProgressMap";
import ProgressBar from "react-bootstrap/ProgressBar";
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
} from "../../Slices/administrator/departmentSlice";
import GeneralFilterWizzard from "../../components/GeneralFilter/Table/GeneralFilterWizzard";
import { useDispatch } from "react-redux";
function Departments() {
  const tableRef = useRef();
  const dispatch = useDispatch();
  const { data: departments, isLoading, error } = useGetDepartments();
  const departmentState = useSelector((state) => state.department);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [searchText, setSearchText] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [columns, setColumns] = useState({
    selectedColumns: [],
    availableColumns: [],
  });
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedDepartments([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedDepartments(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return departmentColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return departments?.data ?? [];
  }, [departments]);

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
      setSelectedDepartments([]);

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
                    <DepartmentIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Department
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
                    action={{ modalContent: CreateDepartment }}
                    size={"lg"}
                    classname={
                      "border-none border rounded-3 font-size-sm  primary-background px-2 text-white text-capitalize"
                    }
                    style={{ padding: "0.4rem" }}
                  >
                    <span>Create Department</span>
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
                      width: departmentState.isGeneralFilterOpen
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
                    {rowCount > 0 && (
                      <BulkActionsToast
                        rowCount={rowCount}
                        label={`${
                          rowCount > 0
                            ? "Specialty Selected"
                            : "Specialties Selected"
                        }`}
                        resetAll={handleResetSelections}
                        dropDownItems={
                          <DropdownItems
                            selectedSpecialties={selectedSpecialties}
                            resetAll={handleResetSelections}
                          />
                        }
                        actionButton={
                          <ActionButtons
                            selectedSpecialties={selectedSpecialties}
                            resetAll={handleResetSelections}
                          />
                        }
                      />
                    )}
                  </motion.div>
                  {departmentState.isGeneralFilterOpen && (
                    <AnimatePresence mode="popLayout">
                      {departmentState.isGeneralFilterOpen && (
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
                                Build a custom view of your department data.
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
                              <span>{departments?.data.length} items</span>
                            </div>
                          </div>
                          <div
                            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column me-1 gap-2"
                            style={{ maxHeight: "52dvh" }}
                          >
                            {departmentState.customFilter.length > 0 ? (
                              <div>
                                {departmentState?.customFilter?.map(
                                  (cFilters) => (
                                    <Fragment key={cFilters.id}>
                                      <GeneralFilterWizzard
                                        cFilters={cFilters}
                                        columns={columns}
                                        moduleState={departmentState}
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
                                    your teacher list.
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
                            {departmentState.customFilter.length > 0 && (
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
export default Departments;

export function ActionComponent(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("md");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "md") => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData,
        handleClose: handleCloseModal,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };
  //update, details, delete, deactivate, activate
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
          onClick={() => handleShowModal(UpdateDepartment, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteDepartment, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DepartmentDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(DeactivateDepartment, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <SuspendIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(ActivateDepartment, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <ActivateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
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

function ActionButtons({ selectedDepartments, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteDepartment }}
        bulkData={selectedDepartments}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Icon icon="iconamoon:trash-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({ selectedDepartments, resetAll, onModalStateChange }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");
  const modalRef = useRef(null);
  useEffect(() => {
    onModalStateChange(showModal, modalRef);
  }, [showModal, onModalStateChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
    setModalContent(
      React.createElement(ContentComponent, {
        handleClose: handleCloseModal,
        resetAll,
        bulkData: selectedDepartments,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteDepartment, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeactivateDepartment, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkActivateDepartment, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </DropDownMenuItem>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
        ref={modalRef}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
function JobPopOver() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { mutate, isLoading, isError, data, error } = useGetJobs();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const popoverVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -4 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 },
  };

  const fetchJobs = () => {
    mutate({
      category: "Department",
      group_by: "status",
      ...(activeTab !== "all" && { status: activeTab }),
    });
  };

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data);
    }
  }, [data]);

  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const eventName = "job.update";
  const channelName = `private:schoolBranch.${schoolAdmin?.school_branch_id}.schoolAdmin.${schoolAdmin?.id}.jobs`;

  useChannel(channelName, eventName, (message) => {
    const payload = message?.data?.payload || message?.payload || message;
    if (!payload || !payload.job_id) return;

    setJobs((prevJobs) => {
      let jobFound = false;
      let jobCompleted = false;

      const updatedJobs = prevJobs.map((group) => {
        const hasJob = group.jobs?.some((j) => j.id === payload.job_id);
        if (hasJob) {
          jobFound = true;
          return {
            ...group,
            jobs: group.jobs.map((j) => {
              if (j.id === payload.job_id) {
                const updatedJob = {
                  ...j,
                  progress_percentage:
                    payload.progress ?? j.progress_percentage,
                  status: payload.status ?? j.status,
                  stage: payload.stage ?? j.stage,
                };

                if (
                  payload.progress === 100 ||
                  payload.status === JOB_STATUS.COMPLETED
                ) {
                  jobCompleted = true;
                }

                return updatedJob;
              }
              return j;
            }),
          };
        }
        return group;
      });

      if (!jobFound) {
        fetchJobs();
        return prevJobs;
      }

      if (jobCompleted) {
        setTimeout(() => {
          fetchJobs();
        }, 500);
      }

      return updatedJobs;
    });
  });

  const activeJobsCount = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return 0;
    const activeStatuses = [JOB_STATUS.PROCESSING, JOB_STATUS.QUEUED];

    return jobs.reduce((total, group) => {
      const activeInGroup = (group.jobs || []).filter((j) =>
        activeStatuses.includes(j.status?.toLowerCase()),
      ).length;
      return total + activeInGroup;
    }, 0);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!debouncedSearch.trim()) return jobs;

    const query = debouncedSearch.toLowerCase();
    return jobs
      .map((group) => {
        const matchingJobs = (group.jobs || []).filter(
          (j) =>
            j.title?.toLowerCase().includes(query) ||
            j.module?.toLowerCase().includes(query) ||
            j.category_name?.toLowerCase().includes(query),
        );

        return {
          ...group,
          jobs: matchingJobs,
        };
      })
      .filter((group) => group.jobs.length > 0);
  }, [jobs, debouncedSearch]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
      >
        <span style={{ lineHeight: "16px" }}>Jobs</span>
        {activeJobsCount > 0 && (
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white fw-semibold"
            style={{ width: "1.2rem", height: "1.2rem", fontSize: "0.75rem" }}
          >
            {activeJobsCount}
          </span>
        )}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-index-master"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={popoverVariants}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="card shadow-sm white-bg"
                style={{
                  width: "42vw",
                  minWidth: "220px",
                  borderRadius: "0.7rem",
                }}
              >
                <div
                  className="font-size-sm rounded-top-4 border-bottom p-2"
                  style={{ background: "#f9f9f9" }}
                >
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Jobs</span>
                    <span>Background activity for Teacher Management</span>
                  </div>
                </div>
                <div className=" d-flex flex-column gap-2">
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      <input
                        type="search"
                        className="form-control font-size-sm"
                        placeholder="Search Job"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <StatusTabs
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                      jobs={jobs}
                    />
                  </div>
                  <div
                    className="d-flex flex-column gap-4 scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto me-1"
                    style={{ maxHeight: "50dvh", paddingBottom: "2rem" }}
                  >
                    {isLoading ? (
                      <>
                        {[...Array(3)].map((_, index) => (
                          <Fragment key={index}>
                            <div className="d-flex flex-column gap-3 ps-2">
                              <RectangleSkeleton width="35%" height="1dvh" />
                              <div className="d-flex flex-column gap-2">
                                {[...Array(3)].map((_, indexOne) => (
                                  <Fragment key={indexOne}>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex flex-row align-items-center gap-2">
                                        <RectangleSkeleton
                                          width="3rem"
                                          height="3rem"
                                        />
                                        <div className="d-flex flex-column gap-2">
                                          <RectangleSkeleton
                                            width="40%"
                                            height="1rem"
                                          />
                                          <RectangleSkeleton
                                            width="60%"
                                            height="1rem"
                                          />
                                        </div>
                                      </div>
                                      <div className="d-flex flex-row align-items-center gap-2">
                                        <RectangleSkeleton
                                          width="20%"
                                          height="1dvh"
                                        />
                                        <RectangleSkeleton
                                          width="20%"
                                          height="1dvh"
                                        />
                                      </div>
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                            <div className="d-flex flex-column gap-3 ps-2">
                              <RectangleSkeleton width="35%" height="1dvh" />
                              <div>
                                {[...Array(3)].map((_, indexTwo) => (
                                  <Fragment key={indexTwo}>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <RectangleSkeleton
                                            width="3rem"
                                            height="3rem"
                                          />
                                          <div className="d-flex flex-column gap-2">
                                            <RectangleSkeleton
                                              width="40%"
                                              height="1rem"
                                            />
                                            <RectangleSkeleton
                                              width="60%"
                                              height="1rem"
                                            />
                                          </div>
                                        </div>
                                        <RectangleSkeleton
                                          width="5rem"
                                          height="1rem"
                                        />
                                      </div>
                                      <RectangleSkeleton
                                        width="100%"
                                        height="1dvh"
                                      />
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </>
                    ) : isError ? (
                      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center gap-2 text-center">
                          <img
                            src="./sss-maskot/error.png"
                            alt="sss-timetable-maskot"
                            style={{
                              height: "250px",
                              width: "250px",
                              objectFit: "contain",
                            }}
                          />
                          <span className="fw-semibold font-size-sm">
                            Timetable Generation Failed
                          </span>
                          <p className="text-muted font-size-sm mb-0">
                            Consider the diagnostic report to identify and
                            resolve constraint conflicts
                          </p>
                        </div>
                      </div>
                    ) : filteredJobs?.length > 0 ? (
                      filteredJobs.map((job, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-2  px-2">
                            <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                              <span className="fw-semibold">
                                {job?.group?.name}
                              </span>
                              <span>
                                <Icon
                                  icon="icon-park-outline:dot"
                                  width={8}
                                  height={8}
                                />
                              </span>
                              <span>{job?.jobs?.length}</span>
                            </div>
                            <div className="d-flex flex-column gap-3">
                              {job?.jobs?.map((jobItem, jobItemIndex) => {
                                const Component = jobProgressMap.find(
                                  (items) => items.status === jobItem?.status,
                                )?.component;
                                return (
                                  <Fragment key={jobItem?.id}>
                                    {Component && (
                                      <Component
                                        jobId={jobItem.id}
                                        title={jobItem.title}
                                        module={jobItem.module}
                                        type={jobItem.type}
                                        processed={jobItem?.successful_items}
                                        issuesCount={jobItem?.failed_items}
                                        total={jobItem?.total_items}
                                        failedItems={jobItem?.failed_items}
                                        startedAt={jobItem?.started_at}
                                        queuedAt={jobItem?.started_at}
                                        timestamp={jobItem?.finished_at}
                                        unit={jobItem?.unit}
                                        processedUnit={jobItem?.processed_unit}
                                        progress={jobItem?.progress_percentage}
                                      />
                                    )}
                                    {!isLastElement(
                                      jobItemIndex,
                                      job?.jobs,
                                    ) && (
                                      <HorizontalDashedLine
                                        dashed={false}
                                        color="#ddd"
                                        thickness={0.5}
                                      />
                                    )}
                                  </Fragment>
                                );
                              })}
                            </div>
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center gap-2 text-center">
                          <img
                            src="./sss-maskot/404.png"
                            alt="sss-timetable-maskot"
                            style={{
                              height: "250px",
                              width: "250px",
                              objectFit: "contain",
                            }}
                          />
                          <span className="fw-semibold font-size-sm">
                            Jobs Not Found
                          </span>
                          <p className="text-muted font-size-sm mb-0">
                            You will need to create a job to see it here. Jobs
                            are created when you perform actions like importing
                            teachers, assigning specialties, or generating
                            timetables.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
function StatusTabs({ activeTab, onTabChange, jobs }) {
  const getCounts = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) {
      return {
        all: 0,
        [JOB_STATUS.PROCESSING]: 0,
        [JOB_STATUS.FAILED]: 0,
        [JOB_STATUS.COMPLETED]: 0,
        [JOB_STATUS.COMPLETED_WITH_ISSUES]: 0,
      };
    }

    const allJobs = jobs.flatMap((group) => group.jobs || []);

    return {
      all: allJobs.length,
      [JOB_STATUS.PROCESSING]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.PROCESSING,
      ).length,
      [JOB_STATUS.FAILED]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.FAILED,
      ).length,
      [JOB_STATUS.COMPLETED]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.COMPLETED,
      ).length,
      [JOB_STATUS.COMPLETED_WITH_ISSUES]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.COMPLETED_WITH_ISSUES,
      ).length,
    };
  }, [jobs]);

  const tabs = [
    { id: "all", label: "All", count: getCounts.all },
    {
      id: JOB_STATUS.PROCESSING,
      label: JOB_STATUS_LABEL[JOB_STATUS.PROCESSING],
      count: getCounts[JOB_STATUS.PROCESSING],
    },
    {
      id: JOB_STATUS.FAILED,
      label: JOB_STATUS_LABEL[JOB_STATUS.FAILED],
      count: getCounts[JOB_STATUS.FAILED],
    },
    {
      id: JOB_STATUS.COMPLETED,
      label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED],
      count: getCounts[JOB_STATUS.COMPLETED],
    },
    {
      id: JOB_STATUS.COMPLETED_WITH_ISSUES,
      label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED_WITH_ISSUES],
      count: getCounts[JOB_STATUS.COMPLETED_WITH_ISSUES],
    },
  ];

  return (
    <div className="border-bottom d-flex flex-row gap-4 font-size-sm px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="border-none bg-transparent text-decoration-none p-0 pb-2 position-relative border-0 rounded-0 font-size-sm"
            style={{
              color: isActive ? "#0ea7e9" : "#000",
              transition: "color 0.2s ease",
            }}
          >
            <span>
              {tab.label} <span className="opacity-75">{tab.count}</span>
            </span>

            {isActive && (
              <motion.span
                layoutId="activeTabUnderline"
                className="position-absolute start-0 w-100 primary-background"
                style={{ height: "2px", bottom: "-1px" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
