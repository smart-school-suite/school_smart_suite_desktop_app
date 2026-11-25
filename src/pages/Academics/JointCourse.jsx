import {
  CircleCheck,
  CircleOff,
  FilePen,
  ReceiptText,
  Trash,
  Trash2,
  UserRoundCog
} from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CreateJointCourse from "../../DrawerContent/JointCourse/CreateJointCourse";
import JointCourseDetails from "../../DrawerContent/JointCourse/JointCourseDetails";
import ManageJointCourseAssignment from "../../DrawerContent/JointCourse/ManageAssignment/ManageJointCourseAssignment";
import UpdateJointCourse from "../../DrawerContent/JointCourse/UpdateJointCourse";
import ActivateJointCourse from "../../ModalContent/JointCourse/ActivateJointCourse";
import BulkActivateJointCourse from "../../ModalContent/JointCourse/BulkActivateJointCourse";
import BulkDeactivateJointCourse from "../../ModalContent/JointCourse/BulkDeactivateJointCourse";
import BulkDeleteJointCourse from "../../ModalContent/JointCourse/BulkDeleteJointCourse";
import DeactivateJointCourse from "../../ModalContent/JointCourse/DeactivateJointCourse";
import DeleteJointCourse from "../../ModalContent/JointCourse/DeleteJointCourse";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Drawer } from "../../components/drawer/Drawer";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { useGetJointCourses } from "../../hooks/jointCourse/useGetJointCourse";
import jointCourseColDefs from "../../utils/table/colDefs/course/jointCourseColDefs";
function JointCourse() {
  const tableWrapperRef = useRef(null);
  const { data: courses, isLoading, error } = useGetJointCourses();
  const tableRef = useRef(null);
  const filters = useTableFilters("academics/joint-course", tableRef);
  const [rowCount, setRowCount] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedCourses([]);
    }
  };
  const memoizedColDefs = useMemo(() => {
    return jointCourseColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return courses?.data ?? [];
  }, [courses]);
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedCourses(Data);
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
                alt="Error loading joint courses"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Joint Courses"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the joint course data. Please try again or create a new joint course."}
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Joint Course"
                  placement="right"
                  drawerChildren={CreateJointCourse}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Joint Course</span>
                  </button>
                </DrawerTrigger>
              </div>
            </div>
          ) : !courses?.data || courses.data.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="No joint courses found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                No Joint Courses Found
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                There are currently no joint course records available. Get
                started by creating your first joint course.
              </p>
              <div className="d-flex align-items-center gap-2">
                <DrawerTrigger
                  title="Create Joint Course"
                  placement="right"
                  drawerChildren={CreateJointCourse}
                >
                  <button className="border-none border rounded-3 font-size-sm px-3 py-2 primary-background text-white text-capitalize">
                    <span>Create Joint Course</span>
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
                  searchPlaceholder="Search Course title, code, credit, description"
                  onReset={handleResetSelections}
                />
                <TableFilterLayout
                  filters={filters}
                  tableWrapperRef={tableWrapperRef}
                >
                  <Table
                    {...filters.gridProps}
                    colDefs={memoizedColDefs}
                    rowData={courses.data}
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
                        rowCount > 1 ? "Courses Selected" : "Course Selected"
                      }`}
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedCourses={selectedCourses}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedCourses={selectedCourses}
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
export default JointCourse;

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
            handleShowDrawer(UpdateJointCourse, {
              title: "Update Joint Course",
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
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(JointCourseDetails, {
              title: "Joint Course Details",
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
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ManageJointCourseAssignment, {
              title: "Manage Joint Course Assignment",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Manage Assignment</span>
              <UserRoundCog size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <HorizontalLine />
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(DeactivateJointCourse, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <CircleOff size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(ActivateJointCourse, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <CircleCheck size={16} strokeWidth={1.5} />
              </div>
            </div>
          </DropDownMenuItem>
        )}
        <HorizontalLine />
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table dropdown-item-danger p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteJointCourse, {
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
function ActionButtons({ selectedCourses, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkDeleteJointCourse }}
        bulkData={selectedCourses}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Trash size={20} strokeWidth={1.5} />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({ selectedCourses, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDeleteJointCourse, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Delete All</span>
          <Trash size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkDeactivateJointCourse, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Deactivate All</span>
          <CircleOff size={16} strokeWidth={1.5} />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkActivateJointCourse, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
          <span className="font-size-sm">Activate All</span>
          <CircleCheck size={16} strokeWidth={1.5} />
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
              selectedCourses: selectedCourses,
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
              selectedCourses: selectedCourses,
              ...modalConfig.modalData,
            }}
            resetAll={resetAll}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
