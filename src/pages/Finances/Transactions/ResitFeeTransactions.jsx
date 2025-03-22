import Navbar from "../../../components/Navbar";
import { ResitFeeNavBarConfig } from "../../../ComponentConfig/navBarConfig";
import { useFetchResitFeeTransactionsQuery } from "../../../Slices/Asynslices/fetchSlice";
import Table from "../../../components/Tables";
import Pageloaderspinner from "../../../components/Spinners";
import CleanArrayData, { renameKeys } from "../../../utils/functions";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import { resitFeeTransactionsTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import DeleteTransaction from "../../../ModalContent/ResitFeeTransactions/DeleteTransaction";
import TransactionDetails from "../../../ModalContent/ResitFeeTransactions/TransactionDetails";
import ReverseTransaction from "../../../ModalContent/ResitFeeTransactions/ReverseTransaction";
function ResitFeeTransactions() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useFetchResitFeeTransactionsQuery();
  const filter_array_keys = [
    "id",
    "transaction_id",
    "payment_method",
    "student_resit.student.name",
    "amount",
    "student_resit.specialty.specialty_name",
    "student_resit.level.name",
    "student_resit.level.level",
  ];
  const renameMapping = {
    id: "id",
    transaction_id: "transaction_id",
    payment_method: "payment_method",
    "student_resit.student.name": "student_name",
    "student_resit.specialty.specialty_name": "specialty_name",
    "student_resit.level.name": "level_name",
    "student_resit.level.level": "level_number",
    amount: "amount",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ResitFeeNavBarConfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{transactions.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={resitFeeTransactionsTableConfig({
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
export default ResitFeeTransactions;

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
