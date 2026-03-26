import Table from "../../components/Tables/Tables";
import { useMemo, useRef } from "react";
import { activationCodeTransactionTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetActivationCodeTransaction } from "../../hooks/activationCode/useGetActivationCodeTransaction";
function Transactions() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useGetActivationCodeTransaction();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return activationCodeTransactionTableConfig();
  }, []);
  const memoizedRowData = useMemo(() => {
    return transactions?.data ?? [];
  }, [transactions]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span>Transactions</span>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <Table
                colDefs={memoizedColDefs}
                rowData={memoizedRowData}
                rowHeight={55}
                ref={tableRef}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Transactions;
