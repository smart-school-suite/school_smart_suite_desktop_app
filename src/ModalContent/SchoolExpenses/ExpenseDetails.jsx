import { formatDate, formatNumber } from "../../utils/functions";
import { Icon } from "@iconify/react";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetExpenseDetails } from "../../hooks/schoolExpenses/useGetSchoolExpenseDetails";
function ExpenseDetails({ rowData, handleClose }) {
  const { id:expenseId } = rowData;
  const { data:expenseDetails, isFetching } = useGetExpenseDetails(expenseId);
  if (isFetching) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Expense Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-1">
          <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
              Expense Title
            </span>
            <span className="my-0 font-size-sm">
              {expenseDetails.data.schoolexpensescategory.name}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
              Reason
            </span>
            <span className="my-0 font-size-sm">
              {expenseDetails.data.description}
            </span>
          </div>
        </div>
         <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
              Amount
            </span>
            <span className="my-0 font-size-sm">
              {formatNumber(expenseDetails.data.amount)}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
             Date of Expenditure
            </span>
            <span className="my-0 font-size-sm">
              {formatDate(expenseDetails.data.date)}
            </span>
          </div>
        </div>
        <hr />
        <span>System Expenditure Info</span>
        <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
             Created At
            </span>
            <span className="my-0 font-size-sm">
              {formatDate(expenseDetails.data.created_at)}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div className="py-2 d-flex flex-column">
            <span className="my-0 font-size-sm gainsboro-color">
             Updated At
            </span>
            <span className="my-0 font-size-sm">
              {formatDate(expenseDetails.data.created_at)}
            </span>
          </div>
        </div>
        </div>
        </div>
    </>
  );
}
export default ExpenseDetails;
