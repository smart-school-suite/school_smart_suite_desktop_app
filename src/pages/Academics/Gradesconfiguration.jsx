import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import CustomModal from "../../components/Modals/Modal";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import CopyScaleWizzard from "../../DrawerContent/GradeScale/CopyScale/CopyScaleWizzard";
import ScaleWizzard from "../../DrawerContent/GradeScale/CreateGradeScale/ScaleWizzard";
import GradeScale from "../../DrawerContent/GradeScale/GradeScale";
import GradeScaleCategoryDetail from "../../DrawerContent/GradeScale/GradeScaleCategoryDetail";
import UpdateGradeScaleWizzard from "../../DrawerContent/GradeScale/UpdateGradeScale/UpdateGradeScaleWizzard";
import { useGetGradeScaleCategories } from "../../hooks/gradeScale/useGetGradeScaleCategories";
import {
  ActivateIcon,
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  ReuseIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { GradeIcon } from "../../icons/Icons";
import ActivateGradeScaleCategory from "../../ModalContent/GradesConfig/ActivateGradeScaleCategory";
import BulkActivateGradeScaleCategory from "../../ModalContent/GradesConfig/BulkActivateGradeScaleCategory";
import BulkDeactivateGradeScaleCategory from "../../ModalContent/GradesConfig/BulkDeactivateGradeScaleCategory";
import BulkDeleteGradeScale from "../../ModalContent/GradesConfig/BulkDeleteGradeScale";
import DeactivateGradeScaleCategory from "../../ModalContent/GradesConfig/DeactivateGradeScaleCategory";
import DeleteGradeScale from "../../ModalContent/GradesConfig/DeleteGradeScale";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  resetScaleState,
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/academics/gradeScaleSlice";
import { GRADE_SCALE_COLUMNS } from "../../utils/gradeScale/gradeScaleColumns";
import { gradeScaleColDefs } from "../../utils/table/colDefs/gradeScale/gradeScaleColDefs";
import { gradeScaleImportColDefs } from "../../utils/table/colDefs/gradeScale/gradeScaleImportColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function Gradesconfiguration() {
  const { data: gradeScales, isLoading, error } = useGetGradeScaleCategories();
  const tableWrapperRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const filters = useTableFilters("academics/gradesconfiguration", tableRef);
  const [rowCount, setRowCount] = useState(0);
  const [selectedGradeScales, setSelectedGradeScales] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedGradeScales([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedGradeScales(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);

  const memoizedColDefs = useMemo(() => {
    return gradeScaleColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return gradeScales?.data ?? [];
  }, [gradeScales]);
  return (
    <>
      <main className="main-container gap-2">
        {isLoading ? (
          <RectangleSkeleton width="100%" height="100%" speed={1} />
        ) : error ? (
          <NotFoundError
            title={error.response.data.errors.title}
            description={error.response.data.errors.description}
          ></NotFoundError>
        ) : (
          <>
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
                    <GradeIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Grade Scale
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver />
                  <ModalButton
                    action={{ modalContent: ImportWizzard }}
                    size={"xl"}
                    rowData={{
                      moduleState: "gradeScale",
                      setImportStatus: setImportStatus,
                      setImportReset: setImportReset,
                      setImportSelectedFile: setImportSelectedFile,
                      moduleColumns: GRADE_SCALE_COLUMNS,
                      setColumnMapping: setColumnMapping,
                      setStandardGroupValue: setStandardGroupValue,
                      moduleInstanceMap: [],
                      module: { name: "Grade Scale" },
                      importModuleColDefs: gradeScaleImportColDefs,
                    }}
                    classname={
                      "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                    }
                  >
                    <span style={{ lineHeight: "16px" }}>Import</span>
                    <ArrowDown size={16} />
                  </ModalButton>
                  <ModalButton
                    classname={
                      "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                    }
                  >
                    <span style={{ lineHeight: "16px" }}>Actions</span>
                    <ChevronDown size={16} />
                  </ModalButton>
                </div>
              </div>
              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search Grade Scale"
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
                <AnimatePresence>
                  {rowCount > 0 && (
                    <BulkActionsToast
                      key="bulk-actions-toast"
                      anchorRef={tableWrapperRef}
                      rowCount={rowCount}
                      label={
                        rowCount > 0
                          ? "Category Selected"
                          : "Categories Selected"
                      }
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedGradeScales={selectedGradeScales}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedGradeScales={selectedGradeScales}
                          resetAll={handleResetSelections}
                        />
                      }
                    />
                  )}
                </AnimatePresence>
              </TableFilterLayout>
            </div>
          </>
        )}
      </main>
    </>
  );
}
export default Gradesconfiguration;

function ActionComponent(props) {
  const dispatch = useDispatch();
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
        {rowData.is_configured ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => {
              dispatch(resetScaleState());
              handleShowDrawer(UpdateGradeScaleWizzard, {
                title: "Update Grade Scale",
                closeOnOutsideClick: false,
                showHeader: false,
              });
            }}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Update Grades Scale</span>
                <UpdateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => {
              dispatch(resetScaleState());
              handleShowDrawer(ScaleWizzard, {
                title: "Grade Scale Configuration",
                closeOnOutsideClick: false,
                showHeader: false,
              });
            }}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Configure Grade</span>
                <CreateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(GradeScaleCategoryDetail, {
              title: "Grade Scale Details",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(GradeScale, {
              title: "Grade Scale",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>View Grades</span>
              <GradeIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(CopyScaleWizzard, {
              title: "Copy Grade Scale",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Copy Grade Scale</span>
              <ReuseIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(DeactivateGradeScaleCategory, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <SuspendIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() =>
              handleShowModal(ActivateGradeScaleCategory, {
                size: "md",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              })
            }
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <ActivateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteGradeScale, {
              size: "md",
              closeOnOutsideClick: false,
              closeOnEscape: false,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Grade Scale</span>
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

function ActionButtons({ selectedGradeScales, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 text-color"}
        bulkData={selectedGradeScales}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All Grade Scales"}>
          <span className="pointer-cursor">
            <Icon icon="iconamoon:trash-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}

function DropdownItems({ selectedGradeScales, resetAll, onModalStateChange }) {
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
          handleShowModal(BulkDeleteGradeScale, {
            size: "md",
            closeOnOutsideClick: false,
            closeOnEscape: false,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Delete All Grade Scales</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowModal(BulkActivateGradeScaleCategory, {
            size: "md",
            closeOnOutsideClick: false,
            closeOnEscape: false,
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Activate All Grade Scales</span>
          <ActivateIcon />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => {
          handleShowModal(BulkDeactivateGradeScaleCategory, {
            size: "md",
            closeOnOutsideClick: true,
            closeOnEscape: true,
          });
        }}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Deactivate Grade Scale</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <hr />
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() =>
          handleShowDrawer(CopyScaleWizzard, {
            title: "Copy Grade Scale",
            closeOnOutsideClick: true,
            showHeader: false,
            drawerData: { action: "bulkCopy" },
          })
        }
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-color">
          <span className="font-size-sm">Copy Grade Scale</span>
          <ReuseIcon />
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
              selectedGradeScales: selectedGradeScales,
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
              selectedGradeScales: selectedGradeScales,
              ...modalConfig.modalData,
            }}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
