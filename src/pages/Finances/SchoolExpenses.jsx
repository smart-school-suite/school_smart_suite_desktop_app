import Navbar from "../../components/Navbar";
import { useFetchSchoolExpensesQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, {
  renameKeys,
  sumAttribute,
  formatNumber,
} from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, {ModalButton} from "../../components/DataTableComponents/ActionComponent";
import { SchoolExpensesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { SchoolExpensesNavBarConfig } from "../../ComponentConfig/navBarConfig";
import CreateExpense from "../../ModalContent/SchoolExpenses/CreateExpense";
import DeleteExpense from "../../ModalContent/SchoolExpenses/DeleteExpense";
import ExpenseDetails from "../../ModalContent/SchoolExpenses/ExpenseDetails";
import UpdateExpense from "../../ModalContent/SchoolExpenses/UpdateExpense";
function SchoolExpenses() {
  const { data: data, error, isLoading } = useFetchSchoolExpensesQuery();
  const filter_array_keys = [
    "id",
    "title",
    "amount",
    "schoolexpensescategory.name",
    "description",
    "date",
  ];
  const renameMapping = {
    title: "Title",
    amount: "Amount",
    "schoolexpensescategory.name": "Category",
    description: "Description",
    date: "Date",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={SchoolExpensesNavBarConfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Spending</p>
            <h1 className="fw-bolder my-0">
              ₣ {formatNumber(sumAttribute(data.data, "amount"))}
            </h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateExpense }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Expenses</span>
            </ModalButton>
          </div>
        </div>
        <div>
          <Table
            colDefs={SchoolExpensesTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default SchoolExpenses;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Expenses",
      actionTitle: "Update",
      modalContent: UpdateExpense,
    },
    {
      modalTitle: "Expenses Details",
      actionTitle: "Details",
      modalContent: ExpenseDetails,
    },
    {
      modalTitle: "Delete Expenses",
      actionTitle: "Delete",
      modalContent: DeleteExpense,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
      style={'tableActionButton primary-background text-white font-size-sm px-2'} >
        <span>Edit Expense</span>
        </ActionButtonDropdown>
    </>
  );
}
