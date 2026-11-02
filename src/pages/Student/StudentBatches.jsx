import { Icon } from "@iconify/react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { NotFoundError } from "../../components/errors/Error";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BatchDetails from "../../DrawerContent/StudentBatch/BatchDetails";
import CreateBatch from "../../DrawerContent/StudentBatch/CreateBatch";
import UpdateBatch from "../../DrawerContent/StudentBatch/UpdateBatch";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { BatchIcon } from "../../icons/Icons";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import ActivateBatch from "../../ModalContent/StudentBatches/ActivateBatch";
import DeactivateBatch from "../../ModalContent/StudentBatches/DeactivateBatch";
import DeleteStudentBatch from "../../ModalContent/StudentBatches/DeleteStudentBatch";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/student/studentBatchSlice";
import { STUDENT_BATCHES_COLUMNS } from "../../utils/student/studentBatchColumns";
import { studentBatchColDefs } from "../../utils/table/colDefs/student/studentBatchColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function StudentBatches() {
  const { data: studentBatches, isLoading, error } = useGetBatches();
  const tableRef = useRef();
  const filters = useTableFilters("student/student-batches", tableRef);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedBatches([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedBatches(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return studentBatchColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return studentBatches?.data ?? [];
  }, [studentBatches]);
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-2 h-100">
          <div className="page-head page-head--bar">
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
                <BatchIcon />
              </div>
              <span className="fw-semibold font-size-sm">Manage Batches</span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category={"studentBatch"} />
              <ModalButton
                action={{ modalContent: ImportWizzard }}
                size={"xl"}
                rowData={{
                  moduleState: "studentBatch",
                  setImportStatus: setImportStatus,
                  setImportReset: setImportReset,
                  setImportSelectedFile: setImportSelectedFile,
                  moduleColumns: STUDENT_BATCHES_COLUMNS,
                  setColumnMapping: setColumnMapping,
                  setStandardGroupValue: setStandardGroupValue,
                  moduleInstanceMap: [],
                  module: { name: "Student Batch" },
                  importModuleColDefs: studentBatchColDefs,
                }}
                classname={
                  "border-none border rounded-3 font-size-sm  d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <ArrowDown size={16} />
              </ModalButton>
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm  d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
              <DrawerTrigger
                title="Create Batch"
                placement="right"
                drawerChildren={CreateBatch}
              >
                <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                  <span>Create Batch</span>
                </button>
              </DrawerTrigger>
            </div>
          </div>
          {isLoading ? (
            <div className="flex-grow-1 w-100">
              <RectangleSkeleton width="100%" height="100%" speed={1} />
            </div>
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : memoizedRowData.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
              <img
                src="/sss-maskot/404.png"
                alt="No batches found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                No Student Batches Available
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                No student batch records were found in the system. Create a new
                batch or import data to get started.
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Batch"
                  placement="right"
                  drawerChildren={CreateBatch}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Batch</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-3 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Batch"
                  onReset={handleResetSelections}
                />
                <TableFilterLayout filters={filters}>
                  <Table
                    {...filters.gridProps}
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
                          ? "Student Selected"
                          : "Student Batches  Selected"
                      }`}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedBatches={selectedBatches}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedBatches={selectedBatches}
                          resetAll={handleResetSelections}
                        />
                      }
                    />
                  )}
                </TableFilterLayout>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default StudentBatches;

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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(UpdateBatch, {
              title: "Update Batch",
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteStudentBatch, {
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(BatchDetails, {
              title: "Batch Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
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
            onClick={() =>
              handleShowModal(DeactivateBatch, {
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
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(ActivateBatch, {
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
function ActionButtons({ selectedBatches, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedBatches}
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
function DropdownItems({ selectedBatches, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedBatches}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent:BulkDeactivateCourse }}
        bulkData={selectedBatches}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        // action={{ modalContent: BulkActivateCourse }}
        bulkData={selectedBatches}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </ModalButton>
    </>
  );
}
