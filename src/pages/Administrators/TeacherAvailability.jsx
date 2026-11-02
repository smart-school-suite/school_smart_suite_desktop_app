import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import TeacherAvailabilitySlot from "../../ModalContent/TeacherAvailability/TeacherAvailabilitySlot";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { Drawer } from "../../components/drawer/Drawer";
import { useGetTeacherAvailability } from "../../hooks/teacherAvailability/useGetTeacherAvailability";
import { DetailsIcon } from "../../icons/ActionIcons";
import { teacherPrefTimeColDefs } from "../../utils/table/colDefs/teachers/teacherPrefTimeColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function TeacherAvailability() {
  const { data: availability, isLoading, error } = useGetTeacherAvailability();
  const dispatch = useDispatch();
  const tableRef = useRef();
  const filters = useTableFilters(
    "administrators/teacher-availability",
    tableRef,
  );
  const [rowCount, setRowCount] = useState(0);
  const [selectedTeacherTimePrefs, setSelectedTeacherTimePrefs] = useState([]);
  const handleResetSelections = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTeacherTimePrefs([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTeacherTimePrefs(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return teacherPrefTimeColDefs({
      ActionComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return availability?.data ?? [];
  }, [availability]);
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
                alt="Error loading teacher time preferences"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                {error?.response?.data?.errors?.title ??
                  "Unable to Load Teacher Time Preferences"}
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                {error?.response?.data?.errors?.description ??
                  "Something went wrong while fetching the teacher time preference data. Please try again or create a new teacher time preference."}
              </p>
            </div>
          ) : !availability?.data || availability.data.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 py-5 text-center my-auto h-100">
              <img
                src="/sss-maskot/404.png"
                alt="No teacher time preferences found"
                style={{
                  height: "140px",
                  width: "140px",
                  objectFit: "contain",
                }}
                className="mb-3"
              />
              <h5 className="fw-semibold font-size-md mb-1">
                No Teacher Time Preferences Found
              </h5>
              <p className="text-muted font-size-sm mb-3 max-w-400">
                There are currently no teacher time preference records
                available. Get started by creating your first teacher time
                preference.
              </p>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <TableToolbar
                  filters={filters}
                  tableRef={tableRef}
                  searchPlaceholder="Search Teacher Time Preference"
                  onReset={handleResetSelections}
                />
                <TableFilterLayout filters={filters}>
                  <Table
                    {...filters.gridProps}
                    colDefs={memoizedColDefs}
                    rowData={memoizedRowData}
                    rowHeight={45}
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
export default TeacherAvailability;

export function ActionComponent(props) {
  const rowData = props.data;
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const handleShow = (Component) => {
    setDrawerContent(
      <Component handleClose={handleClose} drawerData={rowData} />,
    );
    setShowDrawer(true);
  };

  const handleClose = () => {
    setShowDrawer(false);
    setDrawerContent(null);
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
          onClick={() => handleShow(TeacherAvailabilitySlot)}
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
        onClose={handleClose}
        placement={"right"}
        title={"Teacher Availability Details"}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
