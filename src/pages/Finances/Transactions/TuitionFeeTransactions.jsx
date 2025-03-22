import Navbar from "../../../components/Navbar";
import { TuitionFeeNavbarOptions } from "../../../ComponentConfig/navBarConfig";
import { useFecthTuitionFeesTransactionsQuery } from "../../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../../components/Spinners";
import CleanArrayData, { renameKeys } from "../../../utils/functions";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import { tuitionFeesTransactionTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import Table from "../../../components/Tables";
import TransactionDetails from "../../../ModalContent/TuitionFeeTransaction/TransactionDetails";
import ReverseTransaction from "../../../ModalContent/TuitionFeeTransaction/ReverseTransaction";
import DeleteTransaction from "../../../ModalContent/TuitionFeeTransaction/DeleteTransaction";
function TuitionFeeTransactions() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useFecthTuitionFeesTransactionsQuery();
  const filter_array_keys = [
    "id",
    "transaction_id",
    "payment_method",
    "tuition.student.name",
    "amount",
    "tuition.specialty.specialty_name",
    "tuition.level.name",
    "tuition.level.level",
  ];
  const renameMapping = {
    id: "id",
    transaction_id: "transaction_id",
    payment_method: "payment_method",
    "tuition.student.name": "student_name",
    "tuition.specialty.specialty_name": "specialty_name",
    "tuition.level.name": "level_name",
    "tuition.level.level": "level_number",
    amount: "amount",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={TuitionFeeNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{transactions.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={tuitionFeesTransactionTableConfig({
              DropdownComponent,
            })}
            rowData={renameKeys(
              CleanArrayData(transactions.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default TuitionFeeTransactions;

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
      <ActionButtonDropdown
        actions={actions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Transaction</span>
      </ActionButtonDropdown>
    </>
  );
}




