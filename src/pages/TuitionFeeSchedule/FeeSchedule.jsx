import Table from "../../components/Tables/Tables";
import { useGetFeeSchedule } from "../../hooks/feeSchedule/useGetFeeSchedule";
import { useState, useRef, useMemo } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteFeeScheduleSlot from "../../ModalContent/FeeSchedule/DeleteFeeSchedule";
import CreateFeeSchedule from "../../DrawerContent/FeeSchedule/CreateFeeSchedule";
import UpdateFeeSchedule from "../../DrawerContent/FeeSchedule/UpdateFeeSchedule";
import FeeScheduleSlots from "../../ModalContent/FeeSchedule/FeeScheduleSlots";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { CreateIcon, DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import { tuitionFeeScheduleColDefs } from "../../utils/table/colDefs/tuitionfee/tuitionFeeScheduleColDefs";
import { NotFoundError } from "../../components/errors/Error";
import { Drawer } from "../../components/drawer/Drawer";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function FeeSchedule() {
  const { data: feeSchedule, isLoading, error } = useGetFeeSchedule();
  const tableRef = useRef();
  const filters = useTableFilters(
    "tuition-fee-schedule/fee-schedule",
    tableRef,
  );
  const tableWrapperRef = useRef(null);
  const handleResetFilters = () => tableRef.current?.deselectAll?.();
  const memoizedColDefs = useMemo(() => {
    return tuitionFeeScheduleColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return feeSchedule?.data ?? [];
  }, [feeSchedule]);
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
                  searchPlaceholder="Search Schedule"
                  onReset={handleResetFilters}
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
                  />
                </TableFilterLayout>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default FeeSchedule;

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
        {rowData?.config_status ? (
          <MenuItem
            label="Edit Schedule"
            icon={<UpdateIcon />}
            onClick={() =>
              handleShowDrawer(UpdateFeeSchedule, { title: "Edit Payment Schedule" })
            }
          />
        ) : (
          <MenuItem
            label="Configure Schedule"
            icon={<CreateIcon />}
            onClick={() =>
              handleShowDrawer(CreateFeeSchedule, { title: "Configure Payment Schedule" })
            }
          />
        )}
        <MenuItem
          label="View Schedule"
          icon={<DetailsIcon />}
          onClick={() => handleShowModal(FeeScheduleSlots, { size: "md" })}
        />
        <MenuItem
          label="Delete Schedule"
          icon={<DeleteIcon />}
          onClick={() => handleShowModal(DeleteFeeScheduleSlot, { size: "md" })}
        />
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

function MenuItem({ label, icon, onClick }) {
  return (
    <DropDownMenuItem
      className="remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
      onClick={onClick}
    >
      <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
        <span>{label}</span>
        {icon}
      </div>
    </DropDownMenuItem>
  );
}
