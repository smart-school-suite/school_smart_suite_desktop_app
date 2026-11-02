import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkPayAdditionalFee from "../../DrawerContent/AdditionalFee/BulkPayAdditionalFee";
import BulkUpdateAdditionalFee from "../../DrawerContent/AdditionalFee/BulkUpdateAdditionalFee";
import PayAdditionalFee from "../../DrawerContent/AdditionalFee/PayAdditionalFee";
import UpdateAdditionalFee from "../../DrawerContent/AdditionalFee/UpdateAdditionalFee";
import { useGetAdditionalFees } from "../../hooks/additionalFee/useGetAdditionalFees";
import {
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import AdditionalFeeDetail from "../../ModalContent/AdditionalFees/AdditionalFeesDetails";
import BulkDeleteAdditionalFee from "../../ModalContent/AdditionalFees/BulkDeleteAdditionalFee";
import DeleteAdditionalFees from "../../ModalContent/AdditionalFees/DeleteAdditionalFees";
import { additionalFeeColDefs } from "../../utils/table/colDefs/finance/additionalFeeColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function AdditionalFees() {
  const { data: additionalFee, isLoading, error } = useGetAdditionalFees();
  const tableRef = useRef();
  const filters = useTableFilters("additional-fee/additional-fees", tableRef);
  const tableWrapperRef = useRef(null);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdditionalFees, setSelectedAdditionalFee] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAdditionalFee([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAdditionalFee(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return additionalFeeColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return additionalFee?.data ?? [];
  }, [additionalFee]);

  return (
    <>
      <main className="main-container gap-2 h-100">
        <div className="h-100">
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Additional Fees"
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
                        rowCount >= 1
                          ? "Additional Fee Selected"
                          : rowCount >= 2
                            ? "Additional Fees Selected"
                            : null
                      }`}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedAdditionalFees={selectedAdditionalFees}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedAdditionalFees={selectedAdditionalFees}
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
export default AdditionalFees;

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
            handleShowDrawer(PayAdditionalFee, {
              title: "Pay Additional Fees",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Pay Fee</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AdditionalFeeDetail, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Fee Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(UpdateAdditionalFee, {
              title: "Pay Additional Fees",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Fee</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteAdditionalFees, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Fee</span>
              <DeleteIcon />
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
function ActionButtons({ selectedAdditionalFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkPayAdditionalFee }}
        bulkData={selectedAdditionalFee}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor hover-text-red-400">
            <Icon icon="iconamoon:trash-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({
  selectedAdditionalFee,
  resetAll,
  onModalStateChange,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const modalRef = useRef(null);

  const [modalConfig, setModalConfig] = useState({
    component: null,
    size: "lg",
    data: null,
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });

  const [drawerConfig, setDrawerConfig] = useState({
    component: null,
    placement: "right",
    title: "",
    data: null,
    closeOnOutsideClick: true,
    showHeader: true,
  });

  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showModal || showDrawer, modalRef);
    }
  }, [showModal, showDrawer, onModalStateChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfig((prev) => ({ ...prev, component: null, data: null }));
  };

  const handleShowModal = (Component, options = {}) => {
    const configOptions =
      typeof options === "string" ? { size: options } : options;
    const {
      size = "lg",
      data = null,
      closeOnOutsideClick = true,
      closeOnEscape = true,
    } = configOptions;

    setModalConfig({
      component: Component,
      size,
      data,
      closeOnOutsideClick,
      closeOnEscape,
    });
    setShowModal(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setDrawerConfig((prev) => ({ ...prev, component: null, data: null }));
  };

  const handleShowDrawer = (Component, options = {}) => {
    const {
      title = "",
      placement = "right",
      data = null,
      closeOnOutsideClick = true,
      showHeader = true,
    } = options;

    setDrawerConfig({
      component: Component,
      title,
      placement,
      data,
      closeOnOutsideClick,
      showHeader,
    });
    setShowDrawer(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowDrawer(BulkPayAdditionalFee, {
            title: "Pay Additional Fees",
            closeOnOutsideClick: true,
            showHeader: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Pay All</span>
          <CreateIcon />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowDrawer(BulkUpdateAdditionalFee, {
            title: "Update Additional Fees",
            closeOnOutsideClick: true,
            showHeader: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Update All</span>
          <UpdateIcon />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkDeleteAdditionalFee, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-red-400 text-color">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
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
            resetAll={resetAll}
            drawerData={
              drawerConfig.data || {
                selectedAdditionalFee,
                resetAll,
              }
            }
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
        ref={modalRef}
      >
        {modalConfig.component && (
          <modalConfig.component
            handleClose={handleCloseModal}
            resetAll={resetAll}
            modalData={modalConfig.data || selectedAdditionalFee}
            bulkData={{ selectedAdditionalFee, resetAll }}
          />
        )}
      </CustomModal>
    </>
  );
}
