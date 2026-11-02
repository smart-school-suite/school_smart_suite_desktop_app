import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
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
import ResitExamScoreDetails from "../../DrawerContent/ResitEvaluation/ResitExamScoreDetails";
import { useGetResitCandidates } from "../../hooks/resitCandidate/useGetResitCandidates";
import {
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { ExamCandidateIcon } from "../../icons/Icons";
import AddResitScores from "../../ModalContent/ResitCandidate/AddResitScores";
import DeleteCandidate from "../../ModalContent/ResitCandidate/DeleteCandidate";
import DeleteResitScores from "../../ModalContent/ResitCandidate/DeleteResitScores";
import UpdateResitScore from "../../ModalContent/ResitCandidate/UpdateResitScores";
import { resitCandidateColDefs } from "../../utils/table/colDefs/resit/resitCandidateColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function ResitCandidates() {
  const { data: resitCandidates, isLoading, error } = useGetResitCandidates();
  const dispatch = useDispatch();
  const tableWrapperRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const filters = useTableFilters("resit/resit-candidate", tableRef);
  const [rowCount, setRowCount] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedCandidates([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedCandidates(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);

  const memoizedColDefs = useMemo(() => {
    return resitCandidateColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return resitCandidates?.data ?? [];
  }, [resitCandidates]);
  return (
    <>
      <main className="main-container gap-2">
        {isLoading ? (
          <RectangleSkeleton width="100%" height="100%" speed={1} />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : memoizedRowData.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
            <img
              src="/sss-maskot/404.png"
              alt="No resit candidates found"
              style={{
                height: "140px",
                width: "140px",
                objectFit: "contain",
              }}
              className="mb-3"
            />
            <h5 className="fw-semibold font-size-md mb-1">
              No Resit Candidates Available
            </h5>
            <p className="text-muted font-size-sm mb-3 max-w-400">
              No resit candidate records were found for the selected session.
            </p>
          </div>
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
                    <ExamCandidateIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Resit Candidates
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver />
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
                searchPlaceholder="Search Candidate"
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
                          ? "Candidate Selected"
                          : "Candidates Selected"
                      }
                      resetAll={handleResetSelections}
                      dropDownItems={
                        <DropdownItems
                          selectedCandidates={selectedCandidates}
                          resetAll={handleResetSelections}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedCandidates={selectedCandidates}
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
export default ResitCandidates;

function ActionComponent(props) {
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
        {rowData.is_student_evaluated ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => {
              handleShowModal(UpdateResitScore, {
                size: "xl",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              });
            }}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
                <span>Update Resit Scores</span>
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
              handleShowModal(AddResitScores, {
                size: "xl",
                closeOnOutsideClick: true,
                closeOnEscape: true,
              });
            }}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
                <span>Add Resit Scores</span>
                <CreateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}

        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteCandidate, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
              <span>Delete Candidate</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(DeleteResitScores, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Resit Scores</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ResitExamScoreDetails, {
              title: "Resit Exam Candidate Scores",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Resit Exam Result</span>
              <DetailsIcon />
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

function ActionButtons({ selectedCandidates, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedCandidates}
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
function DropdownItems({ selectedCandidates, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedCandidates}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent:BulkDeactivateCourse }}
        bulkData={selectedCandidates}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        // action={{ modalContent: BulkActivateCourse }}
        bulkData={selectedCandidates}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </ModalButton>
    </>
  );
}
