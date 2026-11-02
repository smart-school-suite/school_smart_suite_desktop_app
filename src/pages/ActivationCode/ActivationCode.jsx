import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import { useGetActivationCodes } from "../../hooks/activationCode/useGetActivationCode";
import { activationCodeColDefs } from "../../utils/table/colDefs/activationCode/activationCodeColDefs";
import TableToolbar from "../../components/TableFilters/TableToolbar";
import { TableFilterLayout } from "../../components/TableFilters/TableFilterPanel";
import { useTableFilters } from "../../components/TableFilters/useTableFilters";
function ActivationCode() {
  const { data: activationCodes, isLoading, error } = useGetActivationCodes();
  const tableRef = useRef();
  const filters = useTableFilters("activation-code/activation-code", tableRef);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const memoizedColDefs = useMemo(() => {
    return activationCodeColDefs();
  }, []);

  const memoizedRowData = useMemo(() => {
    return activationCodes?.data ?? [];
  }, [activationCodes]);
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
                  searchPlaceholder="Search Activation Code"
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
export default ActivationCode;
