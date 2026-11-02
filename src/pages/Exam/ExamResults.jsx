import {
  ArrowDown,
  ChevronDown,
  FileChartColumn,
  Megaphone,
  Podium,
  ReceiptText,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
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
import ExamStanding from "../../DrawerContent/ExamResult/ExamStanding";
import { useGetExams } from "../../hooks/examResult/useGetExams";
import { ExamIcon } from "../../icons/Icons";
import PublishExamResult from "../../ModalContent/ExamResults/PublishExamResult";
import examResultColDefs from "../../utils/table/colDefs/exam/examResultColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function ExamResults() {
  const { data: exams, isLoading, error } = useGetExams();
  const tableWrapperRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const filters = useTableFilters("exam/exam-results", tableRef);
  const dispatch = useDispatch();
  const memoizedColDefs = useMemo(() => {
    return examResultColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return exams?.data ?? [];
  }, [exams]);

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
              alt="No exam results found"
              style={{
                height: "140px",
                width: "140px",
                objectFit: "contain",
              }}
              className="mb-3"
            />
            <h5 className="fw-semibold font-size-md mb-1">
              No Exam Results Available
            </h5>
            <p className="text-muted font-size-sm mb-3 max-w-400">
              No exam result records were found in the system.
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
                    <ExamIcon />
                  </div>
                  <span className="fw-semibold font-size-sm">
                    Manage Exam Result
                  </span>
                </div>
                <div className="d-flex flex-row align-item-center gap-2">
                  <JobPopOver category={"Exam"} />
                  <ModalButton>
                    <button
                      className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg gap-2"
                      style={{ padding: "0.65rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Import</span>
                      <ArrowDown size={16} />
                    </button>
                  </ModalButton>
                  <ModalButton>
                    <button
                      className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg gap-2"
                      style={{ padding: "0.65rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Actions</span>
                      <ChevronDown size={16} />
                    </button>
                  </ModalButton>
                </div>
              </div>

              <TableToolbar
                filters={filters}
                tableRef={tableRef}
                searchPlaceholder="Search Exam"
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
          </>
        )}
      </main>
    </>
  );
}
export default ExamResults;

export function ActionComponent(props) {
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
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          // onClick={() =>
          //   handleShowDrawer(UpdateExamWizzard, {
          //     title: "Update Exam",
          //     closeOnOutsideClick: false,
          //     showHeader: false,
          //   })
          // }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Publication Details</span>
              <ReceiptText size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowModal(PublishExamResult, {
              size: "md",
              closeOnOutsideClick: true,
              closeOnEscape: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Publish Results</span>
              <Megaphone size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          // onClick={() =>
          //   handleShowDrawer(ExamDetails, {
          //     title: "Exam Details",
          //     closeOnOutsideClick: true,
          //     showHeader: true,
          //   })
          // }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Evaluation Details</span>
              <FileChartColumn size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ExamStanding, {
              title: "Exam Result Standings",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Exam Standings</span>
              <Podium size={16} strokeWidth={1.5} />
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
