import DataTableNavLoader from "../../../components/PageLoaders/DataTableNavLoader";
import { useGetResitTransactions } from "../../../hooks/studentResit/useGetResitTransactions";
function ResitFeeTransactions() {
  const {data:transactions, isFetching} = useGetResitTransactions();
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
       <div>
         <div className="d-flex flex-row align-items-center mb-2 w-100">
          <div>
            <span className="font-size-sm fw-semibold">Resit Fee Transactions</span>
          </div>
        </div>
       </div>
    </>
  );
}
export default ResitFeeTransactions;