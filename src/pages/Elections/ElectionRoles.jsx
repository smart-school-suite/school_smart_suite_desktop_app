import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import { serverErrorCopy } from "../../utils/election/electionDisplay";
import { Plus } from "lucide-react";
import CreateElectionRole from "../../DrawerContent/ElectionRole/CreateElectionRole";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import ElectionRoleDetails from "../../DrawerContent/ElectionRole/ElectionRoleDetails";
import UpdateElectionRole from "../../DrawerContent/ElectionRole/UpdateElectionRole";
import { useGetElectionRoles } from "../../hooks/electionRole/useGetElectionRoles";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import ActivateElectionRole from "../../ModalContent/ElectionRoles/ActivateElectionRole";
import BulkActivateElectionRole from "../../ModalContent/ElectionRoles/BulkActivateElectionRole";
import BulkDeactivateElectionRole from "../../ModalContent/ElectionRoles/BulkDeactivateElectionRole";
import BulkDeleteElectionRole from "../../ModalContent/ElectionRoles/BulkDeleteElectionRole";
import DeactivateRole from "../../ModalContent/ElectionRoles/DeactivateRole";
import DeleteElectionRole from "../../ModalContent/ElectionRoles/DeleteElectionRole";
import { electionRoleColDefs } from "../../utils/table/colDefs/election/electionRoleColDefs";

import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function ElectionRoles() {
  const { data: electionRoles, isLoading, error } = useGetElectionRoles();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const filters = useTableFilters("elections/election-roles", tableRef);
  const tableWrapperRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedRoles([]);
    }
  };
  const memoizedColDefs = useMemo(() => {
    return electionRoleColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return (electionRoles?.data ?? []).map((role) => {
      const term = role.office_term;
      const years = term?.duration_academic_years ?? 1;
      return {
        ...role,
        election_type_title: role.election_type?.election_title,
        seats: role.seats ?? 1,
        tenure: `${years} year${years > 1 ? "s" : ""} · ${term?.allow_reelection ? `up to ${term.maximum_terms ?? "∞"} terms` : "no re-election"}`,
      };
    });
  }, [electionRoles]);
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedRoles(Data);
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
            <EmptyState
              mascot="error"
              height="100%"
              mascotHeight="7rem"
              {...serverErrorCopy(error, "Unable to load positions", "Something went wrong while loading this list.")}
            />
          ) : memoizedRowData.length === 0 ? (
            <EmptyState
              mascot="sad"
              height="100%"
              mascotHeight="7rem"
              title="No positions yet"
              description="Positions are what people stand for, such as President or Secretary. Each belongs to an election type and has its own seats and office term."
              actions={
                <DrawerTrigger title="Create Position" placement="right" drawerChildren={CreateElectionRole}>
                  <EmptyStateButton icon={Plus}>Create Position</EmptyStateButton>
                </DrawerTrigger>
              }
            />
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search positions"
                  onReset={handleResetSelections}
                  actions={
                    <DrawerTrigger title="Create Position" placement="right" drawerChildren={CreateElectionRole}>
                      <button
                        type="button"
                        className="border-none rounded-3 font-size-sm px-3 primary-background text-white text-nowrap"
                        style={{ padding: "0.38rem" }}
                      >
                        Create Position
                      </button>
                    </DrawerTrigger>
                  }
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
                          ? "Role Selected"
                          : rowCount >= 2
                            ? "Roles Selected"
                            : null
                      }`}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedRoles={selectedRoles}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedRoles={selectedRoles}
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
export default ElectionRoles;

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
            handleShowDrawer(UpdateElectionRole, {
              title: "Update Position",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Role</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ElectionRoleDetails, {
              title: "Position Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Position Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeactivateRole, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Role</span>
              <SuspendIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(ActivateElectionRole, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Role</span>
              <ActivateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteElectionRole, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Role</span>
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

function ActionButtons({ selectedRoles, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteElectionRole }}
        bulkData={selectedRoles}
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
function DropdownItems({ selectedRoles, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDeactivateElectionRole, {
            size: "md",
            closeOnOutsideClick: false,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkActivateElectionRole, {
            size: "md",
            closeOnOutsideClick: false,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkDeleteElectionRole, {
            size: "md",
            closeOnOutsideClick: false,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
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
            drawerData={{
              selectedRoles: selectedRoles,
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
              selectedRoles: selectedRoles,
              ...modalConfig.modalData,
              resetAll: resetAll,
            }}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
