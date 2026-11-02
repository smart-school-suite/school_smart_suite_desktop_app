import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import CreateSpecialty from "../../DrawerContent/Specialty/CreateSpecialty";
import AssignHall from "../../DrawerContent/SpecialtyHall/AssignHall";
import RemoveAssignedHall from "../../DrawerContent/SpecialtyHall/RemoveAssignedHall";
import ViewAssignedHall from "../../DrawerContent/SpecialtyHall/ViewAssignedHall";
import { useGetSpecialties } from "../../hooks/specialtyHall/useGetSpecialties";
import { CreateIcon, DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
import RemoveAllAssignedHalls from "../../ModalContent/SpecialtyHall/RemoveAssignHall";
import { hallSpecialtyColDefs } from "../../utils/table/colDefs/hall/hallSpecialtyColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function SpecialtyHall() {
  const { data: specialties, isLoading, error } = useGetSpecialties();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const filters = useTableFilters("administrators/specialty-hall", tableRef);
  const tableWrapperRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [selectedSpecialties, setSelectedSpeciaties] = useState([]);

  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedSpeciaties([]);
    }
  };
  const memoizedColDefs = useMemo(() => {
    return hallSpecialtyColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return specialties?.data ?? [];
  }, [specialties]);
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedSpeciaties(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);

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
          ) : !specialties?.data || specialties.data.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="No specialties found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                No Specialties Found
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                There are currently no specialty records available. Get started
                by creating your first specialty.
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
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Specialties"
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
                </TableFilterLayout>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default SpecialtyHall;

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
            handleShowDrawer(AssignHall, {
              title: "Assign Hall",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Assign Hall</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(RemoveAssignedHall, {
              title: "Assign Hall",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Remove Assigned Hall</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ViewAssignedHall, {
              title: "View Assigned Halls",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>View assignments</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(RemoveAllAssignedHalls, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Remove All Assigned Halls</span>
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
