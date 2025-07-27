import DataTableNavLoader from "../../../components/PageLoaders/DataTableNavLoader";
import { useGetResitTransactions } from "../../../hooks/studentResit/useGetResitTransactions";
function ResitFeeTransactions() {
  const {data:transactions, isFetching} = useGetResitTransactions();
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>

    </>
  );
}
export default ResitFeeTransactions;