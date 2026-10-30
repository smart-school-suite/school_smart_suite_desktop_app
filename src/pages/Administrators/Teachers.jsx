import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTeacher from "../../DrawerContent/Teacher/CreateTeacher";
import UpdateTeacher from "../../DrawerContent/Teacher/UpdateTeacher";
import Export from "../../ModalContent/Export/Export";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import ActivateTeacher from "../../ModalContent/Teacher/ActivateTeacher";
import BulkActivateTeacher from "../../ModalContent/Teacher/BulkActivateTeacher";
import BulkDeactivateTeacher from "../../ModalContent/Teacher/BulkDeactivateTeacher";
import BulkDeleteTeacher from "../../ModalContent/Teacher/BulkDeleteTeacher";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import FilterColumns from "../../ModalContent/Teacher/FilterColumns";
import {
  addCustomFilter,
  removeCustomFilter,
  resetAllCustomFilters,
  setCustomFilter,
  toggleGeneralFilter,
} from "../../Slices/teacher/teacherSlice";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import GeneralFilterWizzard from "../../components/GeneralFilter/Table/GeneralFilterWizzard";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import SearchInput from "../../components/input/search";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import filterPopOverMap from "../../utils/maps/FilterMap";
import { teacherColDefs } from "../../utils/table/colDefs/teachers/teacherColDefs";
function Teachers() {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teachers);
  const { data: teachers, isLoading, error } = useGetTeachers();
  const tableRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [columns, setColumns] = useState({
    selectedColumns: [],
    availableColumns: [],
  });
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTeachers([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTeachers(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return teacherColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return teachers?.data ?? [];
  }, [teachers]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTeachers([]);

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
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading, memoizedRowData]);

  return (
    <>
      <main className="main-container gap-2 h-100">
        <div className="h-100">
          {isLoading ? (
            <div className="flex-grow-1 w-100 h-100">
              <RectangleSkeleton width="100%" height="100%" speed={0.5} />
            </div>
          ) : error ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="Error loading teachers"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Teachers"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the teacher data. Please try again or create a new teacher."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Teacher"
                  placement="right"
                  drawerChildren={CreateTeacher}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Teacher</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : !teachers?.data || teachers.data.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="No teachers found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                No Teachers Found
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                There are currently no teacher records available. Get started by
                creating your first teacher.
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Teacher"
                  placement="right"
                  drawerChildren={CreateTeacher}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Teacher</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
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
                  <div className="w-50">
                    <SearchInput
                      placeholder={"Search Teacher......"}
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
                        width: teacherState.isGeneralFilterOpen
                          ? "60%"
                          : "100%",
                      }}
                    >
                      <Table
                        colDefs={memoizedColDefs}
                        rowData={memoizedRowData}
                        rowHeight={45}
                        ref={tableRef}
                        handleRowCountFromChild={handleRowCountFromChild}
                        handleRowDataFromChild={handleRowDataFromChild}
                      />
                      {rowCount > 0 && (
                        <BulkActionsToast
                          rowCount={rowCount}
                          label={`${rowCount > 1 ? "Teacher Selected" : "Teachers Selected"}`}
                          resetAll={handleResetSelections}
                          dropDownItems={
                            <DropdownItems
                              selectedTeachers={selectedTeachers}
                              resetAll={handleResetSelections}
                            />
                          }
                          actionButton={
                            <ActionButtons
                              selectedTeachers={selectedTeachers}
                              resetAll={handleResetSelections}
                            />
                          }
                        />
                      )}
                    </motion.div>
                    {teacherState.isGeneralFilterOpen && (
                      <AnimatePresence mode="popLayout">
                        {teacherState.isGeneralFilterOpen && (
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
                                  Build a custom view of your teacher data.
                                </span>
                                <button
                                  className="border-none bg-transparent"
                                  onClick={() =>
                                    dispatch(toggleGeneralFilter())
                                  }
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
                                <span>{teachers?.data.length} items</span>
                              </div>
                            </div>
                            <div
                              className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column me-1 gap-2"
                              style={{ maxHeight: "52dvh" }}
                            >
                              {teacherState.customFilter.length > 0 ? (
                                <div>
                                  {teacherState?.customFilter?.map(
                                    (cFilters) => (
                                      <Fragment key={cFilters.id}>
                                        <GeneralFilterWizzard
                                          cFilters={cFilters}
                                          columns={columns}
                                          moduleState={teacherState}
                                          removeCustomFilter={
                                            removeCustomFilter
                                          }
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
                                      Create one or more conditions to narrow
                                      down your teacher list.
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
                              {teacherState.customFilter.length > 0 && (
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
        </div>
      </main>
    </>
  );
}
export default Teachers;

export function ActionComponent(props) {
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(UpdateTeacher, {
              title: "Update Teacher",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteTeacher, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          // onClick={() =>
          //   handleShowModal(TeacherDetails, {
          //     size: "md",
          //     closeOnOutsideClick: true,
          //     closeOnEscape: true,
          //   })
          // }
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
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(DeactivateTeacher, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
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
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(ActivateTeacher, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
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
function ActionButtons({ selectedTeachers, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedTeachers}
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
function DropdownItems({ selectedTeachers, resetAll, onModalStateChange }) {
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
        bulkData: selectedTeachers,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };

  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeactivateTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkActivateTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
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
