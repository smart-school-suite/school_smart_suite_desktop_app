import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, CalendarClock, List, RotateCcw } from "lucide-react";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
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

// What each tab says when it has no events, and what to do next.
const EMPTY_COPY = {
  all: {
    title: "No school events yet",
    description:
      "Events you create, schedule or save as drafts will appear here.",
    hint: "Invite the whole school or pick students, teachers and administrators.",
    create: "Create Your First Event",
  },
  active: {
    title: "No events are live right now",
    description:
      "Events appear here once they are published, and stay until they end.",
    hint: "Scheduled events move here automatically at their publish time.",
    create: "Create Event",
    secondary: { label: "View Scheduled", path: "/schedule-event", icon: CalendarClock },
  },
  scheduled: {
    title: "Nothing is scheduled",
    description:
      "Schedule an event to publish it automatically at a date and time you choose.",
    hint: 'On the last step of the event drawer, choose "Schedule For Later".',
    create: "Schedule An Event",
  },
  draft: {
    title: "No drafts saved",
    description:
      "Drafts let you start an event and finish it later, even with just a title.",
    hint: 'Use "Save draft" at the top of the event drawer, on any step.',
    create: "Start An Event",
  },
  expired: {
    title: "No past events yet",
    description:
      "Events move here automatically after their end date, so you can look back on them.",
    secondary: { label: "View All Events", path: "/events", icon: List },
  },
};

function CreateEventButton({ label }) {
  return (
    <DrawerTrigger
      title="Create School Event"
      placement="right"
      drawerChildren={CreateEventWizzard}
      closeOnOutsideClick={false}
      closeOnEscape={false}
      showHeader={false}
    >
      <EmptyStateButton icon={CalendarPlus}>{label}</EmptyStateButton>
    </DrawerTrigger>
  );
}

// Empty tab (the API answers 404) or a failed load, with the next step to take.
function EventsFallback({ status, error, onRetry }) {
  const navigate = useNavigate();
  const isEmpty = error?.response?.status === 404;
  const copy = EMPTY_COPY[status] ?? EMPTY_COPY.all;

  if (!isEmpty) {
    const serverError = error?.response?.data?.errors;
    return (
      <EmptyState
        mascot="error"
        title="We couldn't load your events"
        description={
          serverError?.description ??
          "Something went wrong while fetching school events. Check your connection and try again."
        }
        actions={
          <EmptyStateButton icon={RotateCcw} onClick={onRetry}>
            Try Again
          </EmptyStateButton>
        }
      />
    );
  }

  return (
    <EmptyState
      mascot="empty"
      title={copy.title}
      description={copy.description}
      hint={copy.hint}
      actions={
        <>
          {copy.create && <CreateEventButton label={copy.create} />}
          {copy.secondary && (
            <EmptyStateButton
              variant={copy.create ? "secondary" : "primary"}
              icon={copy.secondary.icon}
              onClick={() => navigate(copy.secondary.path)}
            >
              {copy.secondary.label}
            </EmptyStateButton>
          )}
        </>
      }
    />
  );
}

/**
 * School events table for one status: "all", "active", "scheduled", "draft" or "expired".
 * Every school event tab renders this page.
 */
function Events({ status = "all" }) {
  const {
    data: schoolEvents,
    isLoading,
    error,
    refetch,
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
            <EventsFallback status={status} error={error} onRetry={refetch} />
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
