import {
  CircleCheck,
  CircleOff,
  FilePen,
  ReceiptText,
  Trash,
  Trash2
} from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CreateHall from "../../DrawerContent/Hall/CreateHall";
import HallDetails from "../../DrawerContent/Hall/HallDetail";
import UpdateHall from "../../DrawerContent/Hall/UpdateHall";
import ActivateHall from "../../ModalContent/Hall/ActivateHall";
import BulkActivateHall from "../../ModalContent/Hall/BulkActivateHall";
import BulkDeactivateHall from "../../ModalContent/Hall/BulkDeactivateHall";
import BulkDeleteHall from "../../ModalContent/Hall/BulkDeleteHall";
import DeactivateHall from "../../ModalContent/Hall/DeactivateHall";
import DeleteHall from "../../ModalContent/Hall/DeleteHall";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { useGetHalls } from "../../hooks/hall/useGetHalls";
import { hallColDefs } from "../../utils/table/colDefs/hall/hallColDefs";
function Hall() {
  const { data: halls, isLoading, error } = useGetHalls();
  const tableRef = useRef();
  const filters = useTableFilters("administrators/hall", tableRef);
  const tableWrapperRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [selectedHalls, setSelectedHalls] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedHalls([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedHalls(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return hallColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return halls?.data ?? [];
  }, [halls]);
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
                alt="Error loading halls"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ?? "Unable to Load Halls"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the hall data. Please try again or create a new hall."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Hall"
                  placement="right"
                  drawerChildren={CreateHall}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Hall</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : !halls?.data || halls.data.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="No halls found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">No Halls Found</h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                There are currently no hall records available. Get started by
                creating your first hall.
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Hall"
                  placement="right"
                  drawerChildren={CreateHall}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Hall</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Hall, name, location, capacity"
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
                        rowCount > 1 ? "Halls Selected" : "Hall Selected"
                      }`}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedHalls={selectedHalls}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedHalls={selectedHalls}
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
export default Hall;

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
            handleShowDrawer(UpdateHall, {
              title: "Update Hall",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Hall</span>
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
            handleShowDrawer(HallDetails, {
              title: "Update Hall",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Hall Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeactivateHall, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Hall</span>
              <CircleOff size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(ActivateHall, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Hall</span>
              <CircleCheck size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table dropdown-item-danger p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteHall, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Hall</span>
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

function ActionButtons({ selectedHalls, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 text-iron-700"}
        action={{ modalContent: BulkDeleteHall }}
        rowData={{ selectedHalls }}
        bulkData={selectedHalls}
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
function DropdownItems({ selectedHalls, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDeleteHall, {
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
          handleShowModal(BulkDeactivateHall, {
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
          handleShowModal(BulkActivateHall, {
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
              selectedHalls: selectedHalls,
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
              selectedHalls: selectedHalls,
              ...modalConfig.modalData,
            }}
            handleClose={handleCloseModal}
            resetAll={resetAll}
          />
        )}
      </CustomModal>
    </>
  );
}
