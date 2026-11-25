import {
  ArrowDown,
  ChevronDown,
  FilePen,
  ReceiptText,
  Trash2
} from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AcademicYearDetails from "../../DrawerContent/AcademicYear/AcademicYearDetails";
import CreateAcademicYear from "../../DrawerContent/AcademicYear/CreateAcademicYear";
import UpdateAcademicYear from "../../DrawerContent/AcademicYear/UpdateAcademicYear";
import DeleteAcademicYear from "../../ModalContent/AcademicYear/DeleteAcademicYear";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import { AcademicYearIcon } from "../../icons/Icons";
import { academicYearColDefs } from "../../utils/table/colDefs/academicYear/academicYearColDefs";
function AcademicYear() {
  const {
    data: schoolAcademicYears,
    isLoading,
    error,
  } = useGetSchoolAcademicYears();
  const tableRef = useRef();
  const filters = useTableFilters("academics/academic-year", tableRef);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedAcademicYears, setSelectedAcademicYears] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAcademicYears([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAcademicYears(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return academicYearColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return schoolAcademicYears?.data ?? [];
  }, [schoolAcademicYears]);
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
                <AcademicYearIcon />
              </div>
              <span className="fw-semibold font-size-sm">
                Manage Academic Year
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver />
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ height: 36, padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <ArrowDown size={16} />
              </ModalButton>
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
                }
                style={{ height: 36, padding: "0.6rem" }}
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
              <DrawerTrigger
                title="Create Academic Year"
                placement="right"
                drawerChildren={CreateAcademicYear}
                size="md"
              >
                <button
                  className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize"
                  style={{ height: 36 }}
                >
                  <span>Create Academic Year</span>
                </button>
              </DrawerTrigger>
            </div>
          </div>

          {isLoading ? (
            <div className="flex-grow-1 w-100">
              <RectangleSkeleton width="100%" height="100%" speed={0.5} />
            </div>
          ) : error ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
              <img
                src="/sss-maskot/404.png"
                alt="Error loading academic years"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Academic Years"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the academic year data. Please try again or create a new academic year."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Academic Year"
                  placement="right"
                  drawerChildren={CreateAcademicYear}
                size="md"
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Academic Year</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : (
            <>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search Academic Years"
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
              </TableFilterLayout>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default AcademicYear;

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
            handleShowDrawer(UpdateAcademicYear, {
              title: "Update Academic Year",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update</span>
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
            handleShowDrawer(AcademicYearDetails, {
              title: "Academic Year Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table dropdown-item-danger p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteAcademicYear, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
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
