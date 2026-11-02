import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { NotFoundError } from "../../components/errors/Error";
import { useGetStudentActivationCodeStatus } from "../../hooks/activationCode/useGetStudentActivationCodeStatus";
import { studentActivationCodeColDefs } from "../../utils/table/colDefs/activationCode/studentActivationCodeColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function Student() {
  const {
    data: studentActivationStatus,
    isLoading,
    error,
  } = useGetStudentActivationCodeStatus();
  const tableRef = useRef();
  const filters = useTableFilters("activation-code/student", tableRef);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const memoizedColDefs = useMemo(() => {
    return studentActivationCodeColDefs();
  }, []);

  const memoizedRowData = useMemo(() => {
    return studentActivationStatus?.data ?? [];
  }, [studentActivationStatus]);
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
                  searchPlaceholder="Search Student Account"
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
export default Student;
