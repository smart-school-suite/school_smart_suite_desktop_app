import { LayerArrowUp, MessageSquareCode, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ApprovePromotion from "../../DrawerContent/PromotionRecord/ApprovePromotion";
import ApproveRepeat from "../../DrawerContent/PromotionRecord/ApproveRepeat";
import PromotionRecordLog from "../../DrawerContent/PromotionRecord/PromotionRecordLog";
import BulkApprovePromotion from "../../ModalContent/PromotionRecord/BulkApprovePromotion";
import BulkApproveRepeat from "../../ModalContent/PromotionRecord/BulkApproveRepeat";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import { useGetPromotionRecords } from "../../hooks/promotionRecord/useGetPromotionRecords";
import promotionRecordColDefs from "../../utils/table/colDefs/promotion/promotionRecordColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function StudentPromotionRecord() {
  const { data: records, isLoading, error } = useGetPromotionRecords();
  const tableRef = useRef(null);
  const filters = useTableFilters(
    "academics/student-promotion-record",
    tableRef,
  );
  const tableWrapperRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedRecords([]);
    }
  };
  const memoizedColDefs = useMemo(() => {
    return promotionRecordColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return records?.data ?? [];
  }, [records]);
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedRecords(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
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
                  searchPlaceholder="Search Promotion Records"
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
                      label={rowCount > 1 ? "Records Selected" : "Record Selected"}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedRecords={selectedRecords}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedRecords={selectedRecords}
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

export default StudentPromotionRecord;

export function ActionComponent(props) {
  const rowData = props.data;
  // Offer only the decisions the server allows for this record.
  const allows = (action) => rowData?.available_actions?.[action]?.allowed ?? true;
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
        {allows("promote") && (
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApprovePromotion, {
              title: "Approve And Review Student Promotion",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Approve Promotion</span>
              <LayerArrowUp size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        )}
        {allows("repeat") && (
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApproveRepeat, {
              title: "Approve And Review Student Repeat",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Approve Repeat</span>
              <RotateCcw size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        )}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(PromotionRecordLog, {
              title: "Promotion Record Log",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Record Log</span>
              <MessageSquareCode size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        {/* <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(PromotionRecordDetails, {
              title: "Promotion Record Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Record Details</span>
              <SquareText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem> */}
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

const BULK_ACTIONS = [
  { label: "Approve Promotion", icon: LayerArrowUp, component: BulkApprovePromotion },
  { label: "Approve Repeat", icon: RotateCcw, component: BulkApproveRepeat },
];

function ActionButtons({ selectedRecords, resetAll }) {
  return (
    <ModalButton
      classname={"border-none transparent-bg w-100 p-0 text-iron-700"}
      action={{ modalContent: BulkApprovePromotion }}
      bulkData={selectedRecords}
      resetAll={resetAll}
    >
      <CustomTooltip tooltipText={"Approve Promotion"}>
        <span className="pointer-cursor">
          <LayerArrowUp size={20} strokeWidth={1.4} />
        </span>
      </CustomTooltip>
    </ModalButton>
  );
}

function DropdownItems({ selectedRecords, resetAll, onModalStateChange }) {
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (typeof onModalStateChange === "function") {
      onModalStateChange(showModal, modalRef);
    }
  }, [showModal, onModalStateChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalComponent(null);
  };

  const handleShowModal = (Component) => {
    setModalComponent(() => Component);
    setShowModal(true);
  };

  const ModalComponent = modalComponent;

  return (
    <>
      {BULK_ACTIONS.map((item, index) => {
        const ItemIcon = item.icon;
        return (
          <div key={item.label}>
            {index > 0 && <hr />}
            <DropDownMenuItem
              className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
              onClick={() => handleShowModal(item.component)}
            >
              <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
                <span className="font-size-sm">{item.label}</span>
                <ItemIcon size={16} strokeWidth={1.5} />
              </div>
            </DropDownMenuItem>
          </div>
        );
      })}
      <CustomModal
        ref={modalRef}
        show={showModal}
        handleClose={handleCloseModal}
        size="md"
        closeOnOutsideClick
        closeOnEscape
        centered
      >
        {ModalComponent && (
          <ModalComponent
            rowData={{ selectedRecords }}
            resetAll={resetAll}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
