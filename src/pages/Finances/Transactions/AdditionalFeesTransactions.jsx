import Navbar from "../../../components/Navbar";
import { AdditionalFeesNavBarConfig } from "../../../ComponentConfig/navBarConfig";
import { useFetchAddtionalFeesTransactionsQuery } from "../../../Slices/Asynslices/fetchSlice";
import Table from "../../../components/Tables";
import Pageloaderspinner from "../../../components/Spinners";
import CleanArrayData, { renameKeys } from "../../../utils/functions";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import { additionalFeesTransactionsTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import ReverseTransaction from "../../../ModalContent/AdditionalFeesTransactions/ReverseTransaction";
import DeleteTransaction from "../../../ModalContent/AdditionalFeesTransactions/DeleteTransaction";
import TransactionDetails from "../../../ModalContent/AdditionalFeesTransactions/TransactionDetails";
function AdditionalFeeTransactions(){
    const { data:data, isLoading, error } = useFetchAddtionalFeesTransactionsQuery();
    const filter_array_keys = [
        "id",
        "transaction_id",
        "payment_method",
        "addition_fee.student.name",
        "addition_fee.fee_category.title",
        "addition_fee.amount",
        "amount",
        "addition_fee.status"
      ];
      const renameMapping = {
        "id":"id",
        "transaction_id":"transaction_id",
        "payment_method":"payment_method",
        "addition_fee.student.name":"student_name",
        "addition_fee.fee_category.title":"title",
        "addition_fee.amount":"amount",
        "amount":"amount_paid",
        "addition_fee.status":"status"
      };
    if(isLoading){
        return <Pageloaderspinner />
    }
    return(
        <>
        <Navbar 
          options={AdditionalFeesNavBarConfig}
         />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={additionalFeesTransactionsTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
        </>
    )
}
export default AdditionalFeeTransactions;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Delete",
      modalContent: DeleteTransaction,
    },
    {
      actionTitle: "Reverse Transaction",
      modalContent: ReverseTransaction,
    },
    {
      
      actionTitle: "Transaction Details",
      modalContent: TransactionDetails,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
        <span>Edit Transaction</span>
         </ActionButtonDropdown>
    </>
  );
}
