import {
  ArrowUpFromLine,
  ChevronDown,
  CircleCheck,
  CircleOff,
  FilePen,
  ReceiptText,
  Trash,
  Trash2
} from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import CreateDepartment from "../../DrawerContent/Department/CreateDepartment";
import DepartmentDetails from "../../DrawerContent/Department/DepartmentDetails";
import UpdateDepartment from "../../DrawerContent/Department/UpdateDepartment";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { DepartmentIcon } from "../../icons/Icons";
import ActivateDepartment from "../../ModalContent/Department/ActivateDepartment";
import BulkActivateDepartment from "../../ModalContent/Department/BulkActivateDepartment";
import BulkDeactivateDepartment from "../../ModalContent/Department/BulkDeactivateDepartment";
import BulkDeleteDepartment from "../../ModalContent/Department/BulkDeleteDepartment";
import DeactivateDepartment from "../../ModalContent/Department/DeactivateDepartment";
import DeleteDepartment from "../../ModalContent/Department/DeleteDepartment";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/administrator/departmentSlice";
import { DEPARTMENT_COLUMNS } from "../../utils/department/departmentColumns";
import { departmentColDefs } from "../../utils/table/colDefs/department/departmentColDefs";
import { departmentImportColDefs } from "../../utils/table/colDefs/department/departmentImportColDefs";
function Departments() {
  const tableRef = useRef();
  const tableWrapperRef = useRef(null);
  const filters = useTableFilters("administrators/departments", tableRef);
  const { data: departments, isLoading, error } = useGetDepartments();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
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
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-3 h-100">
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
                <DepartmentIcon />
              </div>
              <span className="fw-semibold font-size-sm">
                Manage Department
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category={"Department"} />
              <ModalButton
                action={{ modalContent: ImportWizzard }}
                closeOnOutsideClick={false}
                size={"xl"}
                rowData={{
                  moduleState: "department",
                  setImportStatus: setImportStatus,
                  setImportReset: setImportReset,
                  setImportSelectedFile: setImportSelectedFile,
                  moduleColumns: DEPARTMENT_COLUMNS,
                  setColumnMapping: setColumnMapping,
                  setStandardGroupValue: setStandardGroupValue,
                  moduleInstanceMap: [],
                  module: { name: "Department" },
                  importModuleColDefs: departmentImportColDefs,
                }}
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ height: 36 }}
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <ArrowUpFromLine size={12} />
              </ModalButton>
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ height: 36 }}
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
              <DrawerTrigger
                title="Create Department"
                placement="right"
                drawerChildren={CreateDepartment}
              >
                <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize" style={{ height: 36 }}>
                  <span>Create Department</span>
                </button>
              </DrawerTrigger>
            </div>
          </div>
          {isLoading ? (
            <div className="flex-grow-1 w-100">
              <RectangleSkeleton width="100%" height="100%" speed={0.5} />
            </div>
          ) : error ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
              <img
                src="/sss-maskot/404.png"
                alt="Error loading departments"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Departments"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the department data. Please try again or create a new department."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Department"
                  placement="right"
                  drawerChildren={CreateDepartment}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Department</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search name, description, status"
                onReset={handleResetSelections}
              />

              <TableFilterLayout
                filters={filters}
                tableWrapperRef={tableWrapperRef}
              >
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
                    key="bulk-actions-toast"
                    anchorRef={tableWrapperRef}
                    rowCount={rowCount}
                    label={`${
                      rowCount > 1
                        ? "Departments Selected"
                        : "Department Selected"
                    }`}
                    resetAll={handleResetSelections}
                    dropDownItems={
                      <DropdownItems
                        selectedDepartments={selectedDepartments}
                        resetAll={handleResetSelections}
                      />
                    }
                    actionButton={
                      <ActionButtons
                        selectedDepartments={selectedDepartments}
                        resetAll={handleResetSelections}
                      />
                    }
                  />
                )}
              </TableFilterLayout>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Departments;

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

  const menuItemClassName = "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor";
  return (
    <>
      <ActionButtonDropdown
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <DropDownMenuItem
          className={menuItemClassName}
          onClick={() =>
            handleShowDrawer(UpdateDepartment, {
              title: "Update Department",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
              <span>Update</span>
              <FilePen size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        <DropDownMenuItem
          className={menuItemClassName}
          onClick={() =>
            handleShowDrawer(DepartmentDetails, {
              title: "Department Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
              <span>Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        {rowData?.status === "active" ? (
          <DropDownMenuItem
            className={menuItemClassName}
            onClick={() =>
              handleShowModal(DeactivateDepartment, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
                <span>Deactivate</span>
                <CircleOff size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={menuItemClassName}
            onClick={() =>
              handleShowModal(ActivateDepartment, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
                <span>Activate</span>
                <CircleCheck size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        )}
        <HorizontalLine />
        <DropDownMenuItem
          className={menuItemClassName}
          onClick={() =>
            handleShowModal(DeleteDepartment, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
              <span>Delete</span>
              <Trash2 size={16} strokeWidth={1.5} />
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

function ActionButtons({ selectedDepartments, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 text-iron-700"}
        action={{ modalContent: BulkDeleteDepartment }}
        bulkData={selectedDepartments}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Trash size={20} strokeWidth={1.5} />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({ selectedDepartments, resetAll, onModalStateChange }) {
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const modalRef = useRef(null);

  const [modalConfig, setModalConfig] = useState({
    component: null,
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
    modalData: {},
  });

  const [drawerConfig, setDrawerConfig] = useState({
    component: null,
    placement: "right",
    title: "",
    closeOnOutsideClick: true,
    showHeader: true,
    drawerData: {},
  });

  useEffect(() => {
    if (typeof onModalStateChange === "function") {
      onModalStateChange(showModal, modalRef);
    }
  }, [showModal, onModalStateChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfig((prev) => ({ ...prev, component: null }));
  };

  const handleShowModal = (Component, options = {}) => {
    const {
      size = "md",
      closeOnOutsideClick = true,
      closeOnEscape = true,
      modalData = {},
    } = options;

    setModalConfig({
      component: Component,
      size,
      closeOnOutsideClick,
      closeOnEscape,
      modalData,
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
      drawerData = {},
    } = options;

    setDrawerConfig({
      component: Component,
      title,
      placement,
      closeOnOutsideClick,
      showHeader,
      drawerData,
    });
    setShowDrawer(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkDeleteDepartment, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Delete All</span>
          <Trash size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkDeactivateDepartment, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Deactivate All</span>
          <CircleOff size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkActivateDepartment, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Activate All</span>
          <CircleCheck size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
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
            drawerData={{
              selectedDepartments: selectedDepartments,
              ...drawerConfig.drawerData,
            }}
          />
        )}
      </Drawer>

      <CustomModal
        ref={modalRef}
        show={showModal}
        handleClose={handleCloseModal}
        size={modalConfig.size}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        closeOnEscape={modalConfig.closeOnEscape}
        centered
      >
        {modalConfig.component && (
          <modalConfig.component
            rowData={{
              selectedDepartments: selectedDepartments,
              ...modalConfig.modalData,
            }}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
