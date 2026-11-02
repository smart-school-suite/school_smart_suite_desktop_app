import { Icon } from "@iconify/react";
import { ArrowDown, ChevronDown } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import CreateSemester from "../../DrawerContent/Semester/CreateSemester";
import SemesterDetails from "../../DrawerContent/Semester/SemesterDetails";
import UpdateSemester from "../../DrawerContent/Semester/UpdateSemester";
import BulkDeleteSemester from "../../ModalContent/Semesters/BulkDeleteSemester";
import BulkUpdateSemester from "../../ModalContent/Semesters/BulkUpdateSemester";
import DeleteSemester from "../../ModalContent/Semesters/DeleteSemester";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { useGetSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import { SemesterIcon } from "../../icons/Icons";
import { semesterColDefs } from "../../utils/table/colDefs/semester/semesterColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function Semester() {
  const { data: schoolSemesters, isLoading, error } = useGetSchoolSemesters();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const filters = useTableFilters("academics/semester", tableRef);
  const [rowCount, setRowCount] = useState(0);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedSemesters([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedSemesters(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return semesterColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return schoolSemesters?.data ?? [];
  }, [schoolSemesters]);
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-3 h-100">
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
                <SemesterIcon />
              </div>
              <span className="fw-semibold font-size-sm">Manage Semester</span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver />
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <ArrowDown size={16} />
              </ModalButton>
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
              <DrawerTrigger
                title="Create Semester"
                placement="right"
                drawerChildren={CreateSemester}
              >
                <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                  <span>Create Semester</span>
                </button>
              </DrawerTrigger>
            </div>
          </div>

          {isLoading ? (
            <div className="flex-grow-1 w-100">
              <RectangleSkeleton width="100%" height="100%" speed={1} />
            </div>
          ) : error ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
              <img
                src="/sss-maskot/404.png"
                alt="Error loading semesters"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Semesters"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the semester data. Please try again or create a new semester."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Semester"
                  placement="right"
                  drawerChildren={CreateSemester}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Semester</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search Semester"
                onReset={handleResetSelections}
              />

              <TableFilterLayout filters={filters}>
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
                    rowCount={rowCount}
                    label={`${
                      rowCount > 0 ? "Semester Selected" : "Semesters Selected"
                    }`}
                    resetAll={handleResetSelections}
                    dropDownItems={
                      <DropdownItems
                        selectedSpecialties={selectedSemesters}
                        resetAll={handleResetSelections}
                      />
                    }
                    actionButton={
                      <ActionButtons
                        selectedSpecialties={selectedSemesters}
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
export default Semester;

function ActionComponent(props) {
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
          onClick={() => handleShowDrawer(UpdateSemester, "Update Semester")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteSemester, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowDrawer(SemesterDetails, "Semester Details")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
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
function ActionButtons({ selectedSemesters, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteSemester }}
        bulkData={selectedSemesters}
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
function DropdownItems({ selectedSemesters, resetAll, onModalStateChange }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");
  const modalRef = useRef(null);
  useEffect(() => {
    onModalStateChange(showModal, modalRef);
  }, [showModal, onModalStateChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
    setModalContent(
      React.createElement(ContentComponent, {
        handleClose: handleCloseModal,
        resetAll,
        bulkData: selectedSemesters,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteSemester, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkUpdateSemester, "lg")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Update All</span>
          <UpdateIcon />
        </div>
      </DropDownMenuItem>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
        ref={modalRef}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
