import { FileChartColumn, Megaphone, ReceiptText } from "lucide-react";
import HorizontalLine from "../../components/DashedLine/HorizontalLine";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
import ResitEvaluationDetails from "../../DrawerContent/ResitResult/ResitEvaluationDetails";
import ResitPublicationDetails from "../../DrawerContent/ResitResult/ResitPublicationDetails";
import { useGetResitResultExams } from "../../hooks/resitResult/useGetResitResultExams";
import { ExamIcon } from "../../icons/Icons";
import PublishResitResult from "../../ModalContent/ResitResults/PublishResitResult";
import resitResultColDefs from "../../utils/table/colDefs/resit/resitResultColDefs";

/**
 * Resit result management, like Manage Exam Result without standings:
 * each resit exam's evaluation progress and publication, with actions to
 * publish (or schedule) its results and see the details.
 */
function ResitResult() {
  const { data: exams, isLoading, error } = useGetResitResultExams();
  const tableWrapperRef = useRef(null);
  const tableRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const filters = useTableFilters("resit/resit-results", tableRef);
  const memoizedColDefs = useMemo(() => resitResultColDefs({ ActionComponent }), []);
  const memoizedRowData = useMemo(() => exams?.data ?? [], [exams]);

  return (
    <main className="main-container gap-2">
      {isLoading ? (
        <RectangleSkeleton width="100%" height="100%" speed={1} />
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        />
      ) : memoizedRowData.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto">
          <img
            src="/sss-maskot/404.png"
            alt="No resit results found"
            style={{ height: "140px", width: "140px", objectFit: "contain" }}
            className="mb-3"
          />
          <h5 className="fw-semibold font-size-md mb-1">No Resit Results Available</h5>
          <p className="text-muted font-size-sm mb-3 max-w-400">No resit exams were found in the system.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3 h-100">
          <div className="page-head page-head--bar">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${darkMode ? "dark-mode-active" : "light-mode-active"} d-flex justify-content-center align-items-center`}
                style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem" }}
              >
                <ExamIcon />
              </div>
              <span className="fw-semibold font-size-sm">Manage Resit Result</span>
            </div>
          </div>
          <TableToolbar filters={filters} tableRef={tableRef} searchPlaceholder="Search Resit Exam" />
          <TableFilterLayout filters={filters} tableWrapperRef={tableWrapperRef}>
            <Table {...filters.gridProps} colDefs={memoizedColDefs} rowData={memoizedRowData} ref={tableRef} />
          </TableFilterLayout>
        </div>
      )}
    </main>
  );
}
export default ResitResult;

const ITEM_CLASS = "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor";

function MenuLabel({ label, icon: ItemIcon }) {
  return (
    <div>
      <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm justify-content-between">
        <span>{label}</span>
        <ItemIcon size={16} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function ActionComponent(props) {
  const rowData = props.data;
  const [modal, setModal] = useState(null);
  const [drawer, setDrawer] = useState(null);
  // Released results stay published; a scheduled publication can be moved.
  const canPublish = rowData?.publication_status !== "published";

  return (
    <>
      <ActionButtonDropdown
        buttonContent={"Edit Actions"}
        style={"tableActionButton primary-background text-white font-size-sm px-2"}
      >
        <DropDownMenuItem
          className={ITEM_CLASS}
          onClick={() => setDrawer({ component: ResitPublicationDetails, title: "Publication Details" })}
        >
          <MenuLabel label="Publication Details" icon={ReceiptText} />
        </DropDownMenuItem>
        <HorizontalLine />
        {canPublish && (
          <DropDownMenuItem className={ITEM_CLASS} onClick={() => setModal(() => PublishResitResult)}>
            <MenuLabel label={rowData?.publication_status === "scheduled" ? "Reschedule Results" : "Publish Results"} icon={Megaphone} />
          </DropDownMenuItem>
        )}
        <DropDownMenuItem
          className={ITEM_CLASS}
          onClick={() => setDrawer({ component: ResitEvaluationDetails, title: "Evaluation Details" })}
        >
          <MenuLabel label="Evaluation Details" icon={FileChartColumn} />
        </DropDownMenuItem>
      </ActionButtonDropdown>
      <Drawer
        isOpen={Boolean(drawer)}
        onClose={() => setDrawer(null)}
        placement="right"
        title={drawer?.title}
        closeOnOutsideClick
        showHeader
      >
        {drawer && <drawer.component handleClose={() => setDrawer(null)} drawerData={rowData} />}
      </Drawer>
      <CustomModal show={Boolean(modal)} handleClose={() => setModal(null)} size="md" closeOnOutsideClick closeOnEscape centered>
        {modal && (() => {
          const ModalComponent = modal;
          return <ModalComponent rowData={rowData} handleClose={() => setModal(null)} />;
        })()}
      </CustomModal>
    </>
  );
}
