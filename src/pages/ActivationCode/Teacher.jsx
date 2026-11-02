import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { useGetTeacherActivationCodeStatus } from "../../hooks/activationCode/useGetTeacherActivationCodeStatus";
import { teacherActivationCodeColDefs } from "../../utils/table/colDefs/activationCode/teacherActivationCodeColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function Teacher() {
  const {
    data: teacherActivationStatus,
    isLoading,
    error,
  } = useGetTeacherActivationCodeStatus();
  const tableRef = useRef();
  const filters = useTableFilters("activation-code/teacher", tableRef);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const memoizedColDefs = useMemo(() => {
    return teacherActivationCodeColDefs();
  }, []);

  const memoizedRowData = useMemo(() => {
    return teacherActivationStatus?.data ?? [];
  }, [teacherActivationStatus]);
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
                  searchPlaceholder="Search Teacher Account"
                />
                <TableFilterLayout filters={filters}>
                  <Table
                    {...filters.gridProps}
                    colDefs={memoizedColDefs}
                    rowData={memoizedRowData}
                    rowHeight={45}
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
export default Teacher;
