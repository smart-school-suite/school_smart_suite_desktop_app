import { useMemo, useRef, useState } from "react";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import CreateEventWizzard from "../../DrawerContent/SchoolEvent/CreateSchoolEvent/CreateEventWizzard";
import SchoolEventDetails from "../../DrawerContent/SchoolEvent/SchoolEventDetails";
import { useGetSchoolEventsByStatus } from "../../hooks/schoolEvent/useGetSchoolEvents";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import DeleteEvent from "../../ModalContent/Events/DeleteEvent";
import UpdateEventContent from "../../ModalContent/Events/UpdateEventContent";
import { schoolEventColDefs } from "../../utils/table/colDefs/schoolEvent/eventCategoryColDefs";

/**
 * School events table for one status: "all", "active", "scheduled", "draft" or "expired".
 * Every school event tab renders this page.
 */
function Events({ status = "all" }) {
  const {
    data: schoolEvents,
    isLoading,
    error,
  } = useGetSchoolEventsByStatus(status);
  const tableWrapperRef = useRef(null);
  const tableRef = useRef();
  const filters = useTableFilters(`schoolEvent/${status}`, tableRef);

  const memoizedColDefs = useMemo(
    () => schoolEventColDefs({ ActionComponent }),
    [],
  );

  const memoizedRowData = useMemo(
    () => schoolEvents?.data ?? [],
    [schoolEvents],
  );

  const handleResetSelections = () => {
    tableRef.current?.deselectAll();
  };

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
            <div className="d-flex flex-column gap-2 h-100">
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search School Event"
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
                />
              </TableFilterLayout>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default Events;

function ActionMenuItem({ label, Icon, onClick }) {
  return (
    <DropDownMenuItem
      className={
        "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
      }
      onClick={onClick}
    >
      <div>
        <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
          <span>{label}</span>
          <Icon />
        </div>
      </div>
    </DropDownMenuItem>
  );
}

export function ActionComponent(props) {
  const rowData = props.data;
  const isDraft = rowData?.status === "draft";
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
        {isDraft ? (
          <ActionMenuItem
            label="Edit & Publish Draft"
            Icon={UpdateIcon}
            onClick={() =>
              handleShowDrawer(CreateEventWizzard, {
                title: "Update Draft School Event",
                closeOnOutsideClick: false,
                showHeader: false,
              })
            }
          />
        ) : (
          <ActionMenuItem
            label="Update Content"
            Icon={UpdateIcon}
            onClick={() =>
              handleShowDrawer(UpdateEventContent, {
                title: "Update School Event Content",
                closeOnOutsideClick: false,
                showHeader: false,
              })
            }
          />
        )}
        <ActionMenuItem
          label="Delete Event"
          Icon={DeleteIcon}
          onClick={() => handleShowModal(DeleteEvent)}
        />
        <ActionMenuItem
          label="Event Details"
          Icon={DetailsIcon}
          onClick={() =>
            handleShowDrawer(SchoolEventDetails, {
              title: "School Event Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
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
