import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateHall from "../../DrawerContent/Hall/CreateHall";
import HallDetails from "../../DrawerContent/Hall/HallDetail";
import UpdateHall from "../../DrawerContent/Hall/UpdateHall";
import ActivateHall from "../../ModalContent/Hall/ActivateHall";
import DeactivateHall from "../../ModalContent/Hall/DeactivateHall";
import DeleteHall from "../../ModalContent/Hall/DeleteHall";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { useGetHalls } from "../../hooks/hall/useGetHalls";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { hallColDefs } from "../../utils/table/colDefs/hall/hallColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function Hall() {
  const { data: halls, isLoading, error } = useGetHalls();
  const tableRef = useRef();
  const filters = useTableFilters("administrators/hall", tableRef);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedhalls, setSelectedhalls] = useState([]);
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
                  searchPlaceholder="Search Hall"
                />
                <TableFilterLayout filters={filters}>
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
export default Hall;

export function ActionComponent(props) {
  const rowData = props.data;
  const [showModal, setShowModal] = useState(false);
  const [ModalComponent, setModalComponent] = useState(null);
  const [modalSize, setModalSize] = useState("md");
  const [showDrawer, setShowDrawer] = useState(false);
  const [DrawerComponent, setDrawerComponent] = useState(null);
  const [drawerDetail, setDrawerDetail] = useState({
    placement: "right",
    title: "",
  });
  const handleCloseModal = () => {
    setShowModal(false);
    setModalComponent(null);
  };
  const handleShowModal = (Component, size = "md") => {
    setModalComponent(() => Component);
    setModalSize(size);
    setShowModal(true);
  };
  const handleShowDrawer = (Component, title = "") => {
    setDrawerDetail((prev) => ({ ...prev, title }));
    setDrawerComponent(() => Component);
    setShowDrawer(true);
  };
  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setDrawerComponent(null);
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
          onClick={() => handleShowDrawer(UpdateHall, "Update Hall")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Hall</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowDrawer(HallDetails, "Hall Details")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Hall Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>

        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeactivateHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Hall</span>
              <SuspendIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ActivateHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Hall</span>
              <ActivateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Hall</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
      </ActionButtonDropdown>
      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        placement={drawerDetail?.placement}
        title={drawerDetail?.title}
      >
        {DrawerComponent && (
          <DrawerComponent
            handleClose={handleCloseDrawer}
            drawerData={rowData}
          />
        )}
      </Drawer>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
      >
        {ModalComponent && (
          <ModalComponent rowData={rowData} handleClose={handleCloseModal} />
        )}
      </CustomModal>
    </>
  );
}
