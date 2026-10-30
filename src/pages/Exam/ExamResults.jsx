import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ChevronDown,
  FileChartColumn,
  Megaphone,
  Podium,
  ReceiptText,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import GeneralFilterWizzard from "../../components/GeneralFilter/Table/GeneralFilterWizzard";
import SearchInput from "../../components/input/search";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import ExamStanding from "../../DrawerContent/ExamResult/ExamStanding";
import { useGetExams } from "../../hooks/examResult/useGetExams";
import { ExamIcon } from "../../icons/Icons";
import PublishExamResult from "../../ModalContent/ExamResults/PublishExamResult";
import Export from "../../ModalContent/Export/Export";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import FilterColumns from "../../ModalContent/Teacher/FilterColumns";
import {
  addCustomFilter,
  removeCustomFilter,
  resetAllCustomFilters,
  setCustomFilter,
  toggleGeneralFilter,
} from "../../Slices/exam/examResultSlice";
import filterPopOverMap from "../../utils/maps/FilterMap";
import examResultColDefs from "../../utils/table/colDefs/exam/examResultColDefs";
function ExamResults() {
  const { data: exams, isLoading, error } = useGetExams();
  const tableWrapperRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const examState = useSelector((state) => state.examResult);
  const tableRef = useRef();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const [columns, setColumns] = useState({
    selectedColumns: [],
    availableColumns: [],
  });
  const memoizedColDefs = useMemo(() => {
    return examResultColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return exams?.data ?? [];
  }, [exams]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();

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
          <RectangleSkeleton width="100%" height="100%" speed={1} />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : memoizedRowData.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
            <img
              src="/sss-maskot/404.png"
              alt="No exam results found"
              style={{
                height: "140px",
                width: "140px",
                objectFit: "contain",
              }}
              className="mb-3"
            />
            <h5 className="fw-semibold font-size-md mb-1">
              No Exam Results Available
            </h5>
            <p className="text-muted font-size-sm mb-3 max-w-400">
              No exam result records were found in the system.
            </p>
          </div>
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
                    <ExamIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Exam Result
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver category={"Exam"} />
                  <ModalButton>
                    <button
                      className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg gap-2"
                      style={{ padding: "0.65rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Import</span>
                      <ArrowDown size={16} />
                    </button>
                  </ModalButton>
                  <ModalButton>
                    <button
                      className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg gap-2"
                      style={{ padding: "0.65rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Actions</span>
                      <ChevronDown size={16} />
                    </button>
                  </ModalButton>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    {columns?.selectedColumns?.map((c, index) => {
                      const FilterPopOver = filterPopOverMap.find(
                        (f) => f.cellDataType === c.cellDataType,
                      )?.component;
                      if (!FilterPopOver) return null;
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
                      className="border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
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
                      className="border-none border rounded-3 font-size-sm d-flex flex-row align-items-center white-bg"
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
                  <div className="w-50">
                    <SearchInput
                      placeholder={"Search Exam......"}
                      value={searchText}
                      onChange={(val) => handleSearch(val)}
                      hotkey="Ctrl+K"
                    />
                  </div>
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
                      width: examState.isGeneralFilterOpen ? "60%" : "100%",
                    }}
                    ref={tableWrapperRef}
                  >
                    <Table
                      colDefs={memoizedColDefs}
                      rowData={memoizedRowData}
                      ref={tableRef}
                      handleRowCountFromChild={handleRowCountFromChild}
                      handleRowDataFromChild={handleRowDataFromChild}
                    />
                    <AnimatePresence>
                      {rowCount > 0 && (
                        <BulkActionsToast
                          key="bulk-actions-toast"
                          anchorRef={tableWrapperRef}
                          rowCount={rowCount}
                          label={
                            rowCount > 0
                              ? "Result Selected"
                              : "Results Selected"
                          }
                          resetAll={handleResetSelections}
                          dropDownItems={
                            <DropdownItems
                              selectedResults={selectedResults}
                              resetAll={handleResetSelections}
                            />
                          }
                          actionButton={
                            <ActionButtons
                              selectedResults={selectedResults}
                              resetAll={handleResetSelections}
                            />
                          }
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {examState.isGeneralFilterOpen && (
                    <AnimatePresence mode="popLayout">
                      {examState.isGeneralFilterOpen && (
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
                                Build a custom view of your Exam data.
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
                                <span>Filter Exam Result</span>
                              </div>
                              <span>{memoizedRowData.length ?? 0} items</span>
                            </div>
                          </div>
                          <div
                            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column me-1 gap-2"
                            style={{ maxHeight: "52dvh" }}
                          >
                            {examState.customFilter.length > 0 ? (
                              <div>
                                {examState?.customFilter?.map((cFilters) => (
                                  <Fragment key={cFilters.id}>
                                    <GeneralFilterWizzard
                                      cFilters={cFilters}
                                      columns={columns}
                                      moduleState={examState}
                                      removeCustomFilter={removeCustomFilter}
                                      setCustomFilter={setCustomFilter}
                                    />
                                  </Fragment>
                                ))}
                              </div>
                            ) : (
                              <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4">
                                <div className="text-center d-flex flex-column gap-1 mb-3">
                                  <span className="fw-semibold">
                                    Build a custom filter
                                  </span>
                                  <span className="text-muted">
                                    Create one or more conditions to narrow down
                                    your Exam list.
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
                            {examState.customFilter.length > 0 && (
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
export default ExamResults;

export function ActionComponent(props) {
  const dispatch = useDispatch();
  const rowData = props.data;
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    component: null,
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });
  const [drawerConfig, setDrawerConfig] = useState({
    component: null,
    placement: "right",
    title: "",
    closeOnOutsideClick: true,
    showHeader: true,
  });

  // Modal handlers
  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfig((prev) => ({ ...prev, component: null }));
  };

  const handleShowModal = (Component, options = {}) => {
    const {
      size = "md",
      closeOnOutsideClick = true,
      closeOnEscape = true,
    } = options;

    setModalConfig({
      component: Component,
      size,
      closeOnOutsideClick,
      closeOnEscape,
    });
    setShowModal(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setDrawerConfig((prev) => ({ ...prev, component: null }));
  };

  const handleShowDrawer = (Component, options = {}) => {
    const {
      title = "",
      placement = "right",
      closeOnOutsideClick = true,
      showHeader = true,
    } = options;

    setDrawerConfig({
      component: Component,
      title,
      placement,
      closeOnOutsideClick,
      showHeader,
    });
    setShowDrawer(true);
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
          // onClick={() =>
          //   handleShowDrawer(UpdateExamWizzard, {
          //     title: "Update Exam",
          //     closeOnOutsideClick: false,
          //     showHeader: false,
          //   })
          // }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Publication Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(PublishExamResult, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Publish Results</span>
              <Megaphone size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          // onClick={() =>
          //   handleShowDrawer(ExamDetails, {
          //     title: "Exam Details",
          //     closeOnOutsideClick: true,
          //     showHeader: true,
          //   })
          // }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Evaluation Details</span>
              <FileChartColumn size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ExamStanding, {
              title: "Exam Result Standings",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Exam Standings</span>
              <Podium size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
      </ActionButtonDropdown>
      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        placement={drawerConfig.placement}
        title={drawerConfig.title}
        closeOnOutsideClick={drawerConfig.closeOnOutsideClick}
        showHeader={drawerConfig.showHeader}
      >
        {drawerConfig.component && (
          <drawerConfig.component
            handleClose={handleCloseDrawer}
            drawerData={rowData}
          />
        )}
      </Drawer>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalConfig.size}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        closeOnEscape={modalConfig.closeOnEscape}
        centered
      >
        {modalConfig.component && (
          <modalConfig.component
            rowData={rowData}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
