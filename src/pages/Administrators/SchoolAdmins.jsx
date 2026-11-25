import {
  ArrowUpFromLine,
  ChevronDown,
  CircleCheck,
  CircleOff,
  FilePen,
  ReceiptText,
  Trash,
  Trash2,
  UserRoundMinus,
  UserRoundPlus
} from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import CreateSchoolAdmin from "../../DrawerContent/SchoolAdmin/CreateSchoolAdmin";
import SchoolAdminDetails from "../../DrawerContent/SchoolAdmin/SchoolAdminDetails";
import UpdateSchoolAdmin from "../../DrawerContent/SchoolAdmin/UpdateSchoolAdmin";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import ActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/Activate";
import BulkActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkActivate";
import BulkDeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkDeactivate";
import BulkDelete from "../../ModalContent/SchoolAdmin/BulkDelete";
import DeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/Deactivate";
import DeleteSchoolAdmin from "../../ModalContent/SchoolAdmin/DeleteSchoolAdmin";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/administrator/schoolAdminSlice";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { NotFoundError } from "../../components/errors/Error";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { SchoolAdminIcon } from "../../icons/Icons";
import { SCHOOL_ADMIN_COLUMNS } from "../../utils/administrator/schoolAdminColumns";
import { schoolAdminColDefs } from "../../utils/table/colDefs/schoolAdmin/schoolAdminColDefs";
function SchoolAdmins() {
  const tableRef = useRef();
  const tableWrapperRef = useRef(null);
  const filters = useTableFilters("administrators/school-admins", tableRef);
  const { data: schoolAdmins, isLoading, error } = useGetSchoolAdmins();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAdmins([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAdmins(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return schoolAdminColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return schoolAdmins?.data ?? [];
  }, [schoolAdmins]);

  return (
    <>
      <main className="main-container gap-2">
        {isLoading ? (
          <RectangleSkeleton width="100%" height="100%" />
        ) : error ? (
          <NotFoundError
            title={error.response.data.errors.title}
            description={error.response.data.errors.description}
          ></NotFoundError>
        ) : (
          <>
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
                    <SchoolAdminIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage School Admins
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver category={"School Admin"} />
                  <ModalButton
                    action={{ modalContent: ImportWizzard }}
                    size={"xl"}
                    rowData={{
                      moduleState: "schoolAdmin",
                      setImportStatus: setImportStatus,
                      setImportReset: setImportReset,
                      setImportSelectedFile: setImportSelectedFile,
                      moduleColumns: SCHOOL_ADMIN_COLUMNS,
                      setColumnMapping: setColumnMapping,
                      setStandardGroupValue: setStandardGroupValue,
                      moduleInstanceMap: [],
                      module: { name: "School Admin" },
                      importModuleColDefs: schoolAdminColDefs,
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
                    title="Create Admin"
                    placement="right"
                    drawerChildren={CreateSchoolAdmin}
                  >
                    <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize" style={{ height: 36 }}>
                      <span>Create Admin</span>
                    </button>
                  </DrawerTrigger>
                </div>
              </div>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search Admin email, username, name"
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
                        ? "School Admins Selected"
                        : "School Admin Selected"
                    }`}
                    resetAll={handleResetSelections}
                    dropDownItems={
                      <DropdownItems
                        selectedAdmins={selectedAdmins}
                        resetAll={handleResetSelections}
                      />
                    }
                    actionButton={
                      <ActionButtons
                        selectedAdmins={selectedAdmins}
                        resetAll={handleResetSelections}
                      />
                    }
                  />
                )}
              </TableFilterLayout>
            </div>
          </>
        )}
      </main>
    </>
  );
}
export default SchoolAdmins;

function ActionButtons({ selectedAdmins, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 text-iron-700"}
        action={{ modalContent: BulkDelete }}
        bulkData={selectedAdmins}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Trash size={20} strokeWidth={1.4} />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({ selectedAdmins, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDelete, {
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
          handleShowModal(BulkDeactivateSchoolAdmin, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Deactivate All</span>
          <UserRoundMinus size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkActivateSchoolAdmin, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Activate All</span>
          <UserRoundPlus size={16} strokeWidth={1.5} />
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
              selectedAdmins: selectedAdmins,
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
              selectedAdmins: selectedAdmins,
              ...modalConfig.modalData,
            }}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
function ActionComponent(props) {
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
            handleShowDrawer(UpdateSchoolAdmin, {
              title: "Update School Admin",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update</span>
              <FilePen size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(SchoolAdminDetails, {
              title: "School Admin Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        {/* <DropDownMenuItem
                  className={
                    "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
                  }
                  onClick={() => handleShowModal(ManagePermission, "lg")}
                >
                  <div>
                    <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                      <span>Manage Permission</span>
                      <PermissionIcon />
                    </div>
                  </div>
                </DropDownMenuItem> */}
        {/* <DropDownMenuItem
                  className={
                    "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
                  }
                  onClick={() => handleShowModal(ManageRoles, "lg")}
                >
                  <div>
                    <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                      <span>Manage Role</span>
                      <RoleIcon />
                    </div>
                  </div>
                </DropDownMenuItem> */}
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor "
            }
            onClick={() =>
              handleShowModal(DeactivateSchoolAdmin, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between ">
                <span>Deactivate</span>
                <CircleOff size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor "
            }
            onClick={() =>
              handleShowModal(ActivateSchoolAdmin, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between ">
                <span>Activate</span>
                <CircleCheck size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        )}
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table dropdown-item-danger p-0 rounded-2 pointer-cursor"
          }
          size={"lg"}
          onClick={() =>
            handleShowModal(DeleteSchoolAdmin, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
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
