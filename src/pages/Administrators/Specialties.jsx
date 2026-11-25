import { ArrowUpFromLine, CircleCheck, CircleOff, FilePen, ReceiptText, Trash, Trash2 } from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreateSpecialty from "../../DrawerContent/Specialty/CreateSpecialty";
import SpecialtyDetails from "../../DrawerContent/Specialty/SpecialtyDetails";
import UpdateSpecialty from "../../DrawerContent/Specialty/UpdateSpecialty";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import ActivateSpecialty from "../../ModalContent/Specialty/ActivateSpecialty";
import BulkActivateSpecialty from "../../ModalContent/Specialty/BulkActivateSpecialty";
import BulkDeactivateSpecialty from "../../ModalContent/Specialty/BulkDeactivateSpecialty";
import BulkDeleteSpecialty from "../../ModalContent/Specialty/BulkDeleteSpecialty";
import DeactivateSpecialty from "../../ModalContent/Specialty/DeactivateSpecialty";
import DeleteSpecialty from "../../ModalContent/Specialty/DeleteSpecialty";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/administrator/specialtySlice";
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
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { SpecialtyIcon } from "../../icons/Icons";
import { SPECIALTY_COLUMNS } from "../../utils/specialty/specialtyColumns";
import { specialtyColDefs } from "../../utils/table/colDefs/specialty/specialtyColDefs";
import { specialtyImportColDefs } from "../../utils/table/colDefs/specialty/specialtyImportColDefs";
function Specialties() {
  const { data: specialty, isLoading, error } = useGetSpecialties();
  const tableRef = useRef();
  const tableWrapperRef = useRef(null);
  const filters = useTableFilters("administrators/specialties", tableRef);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedSpecialties([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedSpecialties(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return specialtyColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return specialty?.data ?? [];
  }, [specialty]);
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-3 h-100">
          {/* Always Visible Header / Navbar */}
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
                <SpecialtyIcon />
              </div>
              <span className="fw-semibold font-size-sm">
                Manage Specialties
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category={"Specialty"} />
              <ModalButton
                action={{ modalContent: ImportWizzard }}
                closeOnOutsideClick={false}
                size={"xl"}
                rowData={{
                  moduleState: "specialty",
                  setImportStatus: setImportStatus,
                  setImportReset: setImportReset,
                  setImportSelectedFile: setImportSelectedFile,
                  moduleColumns: SPECIALTY_COLUMNS,
                  setColumnMapping: setColumnMapping,
                  setStandardGroupValue: setStandardGroupValue,
                  moduleInstanceMap: [],
                  module: { name: "Specialty" },
                  importModuleColDefs: specialtyImportColDefs,
                }}
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ height: 36 }}
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <ArrowUpFromLine size={12} />
              </ModalButton>
              <DrawerTrigger
                title="Create Specialty"
                placement="right"
                drawerChildren={CreateSpecialty}
              >
                <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize" style={{ height: 36 }}>
                  <span>Create Specialty</span>
                </button>
              </DrawerTrigger>
            </div>
          </div>

          {/* Dynamic Content Body (Loading / Error / Data View) */}
          {isLoading ? (
            <div className="flex-grow-1 w-100">
              <RectangleSkeleton width="100%" height="100%" speed={1} />
            </div>
          ) : error ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
              <img
                src="/sss-maskot/404.png"
                alt="Error loading specialties"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Specialties"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the specialty data. Please try again or create a new specialty."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Specialty"
                  placement="right"
                  drawerChildren={CreateSpecialty}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Specialty</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search name, description, department"
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
                        ? "Specialties Selected"
                        : "Specialty Selected"
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
              </TableFilterLayout>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Specialties;

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
            handleShowDrawer(UpdateSpecialty, {
              title: "Update Specialty",
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
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(SpecialtyDetails, {
              title: "Specialty Details",
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
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(DeactivateSpecialty, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <CircleOff size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(ActivateSpecialty, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
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
          onClick={() =>
            handleShowModal(DeleteSpecialty, {
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
function ActionButtons({ selectedSpecialties, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 text-iron-700"}
        action={{ modalContent: BulkDeleteSpecialty }}
        bulkData={selectedSpecialties}
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
function DropdownItems({ selectedSpecialties, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDeleteSpecialty, {
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
          handleShowModal(BulkDeactivateSpecialty, {
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
          handleShowModal(BulkActivateSpecialty, {
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
              selectedSpecialties: selectedSpecialties,
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
              selectedSpecialties: selectedSpecialties,
              ...modalConfig.modalData,
            }}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
