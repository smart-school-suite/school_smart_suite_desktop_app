import {
  CircleCheck,
  CircleChevronRight,
  CircleX,
  GraduationCap,
  LockKeyhole,
  LockOpen,
  UserStar,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ApproveAlumnus from "../../DrawerContent/GraduationRecord/ApproveAlumus";
import ApproveContinuation from "../../DrawerContent/GraduationRecord/ApproveContinuation";
import ApproveEligibility from "../../DrawerContent/GraduationRecord/ApproveEligibility";
import ApproveIneligibility from "../../DrawerContent/GraduationRecord/ApproveIneligibility";
import ApproveUnblock from "../../DrawerContent/GraduationRecord/ApproveUnblock";
import BlockGraduation from "../../DrawerContent/GraduationRecord/BlockGraduation";
import RequestReview from "../../DrawerContent/GraduationRecord/RequestReview";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import { useGetGraduationRecords } from "../../hooks/graduationRecord/useGetGraduationRecord";
import graduationRecordColDefs from "../../utils/table/colDefs/graduation/graduationRecordColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function GraduationRecord() {
  const { data: records, isLoading, error } = useGetGraduationRecords();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const filters = useTableFilters("promotion/graduation-record", tableRef);
  const tableWrapperRef = useRef(null);

  const memoizedColDefs = useMemo(() => {
    return graduationRecordColDefs({
      ActionComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return records?.data ?? [];
  }, [records]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div className="h-100">
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Graduation Records"
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
        </div>
      </main>
    </>
  );
}
export default GraduationRecord;

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
            handleShowDrawer(ApproveAlumnus, {
              title: "Approve Alumnus",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Approve Alumnus</span>
              <GraduationCap size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApproveContinuation, {
              title: "Approve Continuation",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Approve Continuation</span>
              <CircleChevronRight size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApproveEligibility, {
              title: "Approve Eligibility",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Approve Eligibility</span>
              <CircleCheck size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(BlockGraduation, {
              title: "Block Student Graduation",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Block Graduation</span>
              <LockKeyhole size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApproveIneligibility, {
              title: "Approve Ineligibility",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Mark Ineligible</span>
              <CircleX size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(RequestReview, {
              title: "Request Graduation Review",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Request Review</span>
              <UserStar size={16} strokeWidth={1.5} />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() =>
            handleShowDrawer(ApproveUnblock, {
              title: "Approve Unblock Graduation",
              closeOnOutsideClick: true,
              showHeader: true,
            })
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>UnBlock</span>
              <LockOpen size={16} strokeWidth={1.5} />
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
