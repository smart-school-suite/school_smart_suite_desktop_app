import Navbar from "../../../components/Navbar";
import { RegistrationFeesNavBarCongfig } from "../../../ComponentConfig/navBarConfig";
import { useFetchRegistrationFeeTransactionsQuery } from "../../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../../components/Spinners";
import CleanArrayData, { renameKeys } from "../../../utils/functions";
import Table from "../../../components/Tables";
import { registrationFeeTransactionTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import { useReverseRegistrationFeeTransactionMutation } from "../../../Slices/Asynslices/deleteSlice";
import { SingleSpinner } from "../../../components/Spinners";
import { useState } from "react";
function RegistrationFeeTransactions() {
  const {
    data: registrationFeeTransactions,
    isLoading,
    error,
  } = useFetchRegistrationFeeTransactionsQuery();
  const filter_array_keys = [
    "id",
    "transaction_id",
    "payment_method",
    "registration_fee.student.name",
    "amount",
    "registration_fee.specialty.specialty_name",
    "registration_fee.level.name",
    "registration_fee.level.level",
  ];
  const renameMapping = {
    id: "id",
    transaction_id: "transaction_id",
    payment_method: "payment_method",
    "registration_fee.student.name": "student_name",
    "registration_fee.specialty.specialty_name": "specialty_name",
    "registration_fee.level.name": "level_name",
    "registration_fee.level.level": "level_number",
    amount: "amount",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={RegistrationFeesNavBarCongfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{registrationFeeTransactions.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTransactionTableConfig({
              DropdownComponent,
            })}
            rowData={renameKeys(
              CleanArrayData(registrationFeeTransactions.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default RegistrationFeeTransactions;
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

  function DeleteTransaction({ row_id:transactionId, handleClose }){
    return(
        <>
        <span>{transactionId}</span>
        </>
    )
  }
  function ReverseTransaction({ row_id:transactionId, handleClose }){
        const [feedback, setFeedback] = useState({
          message: "",
          type: null,
          loading: false,
        });
        const [reverseRegistrationFeeTransaction] =
        useReverseRegistrationFeeTransactionMutation();
      
        const handleReverseTransaction = async () => {
          setFeedback({ message: "", type: null, loading: true });
          try {
            await reverseRegistrationFeeTransaction(transactionId).unwrap();
            setFeedback({
              message: "Transaction Reversed Successfully",
              type: "success",
              loading: false,
            });
          } catch (e) {
            setFeedback({
              message: "Oops, Couldn't Reverse Transaction",
              type: "error",
              loading: false,
            });
          }
        };
    return(
        <>
                 {feedback.loading ? (
          <SingleSpinner />
        ) : !feedback.message ? (
          <div className="w-100">
            <h4 className="fw-semibold">Are you absolutely sure?</h4>
            <p className="my-3" style={{ fontSize: "0.85rem" }}>
              This action cannot be undone. This will permanently delete this
              account and remove this account data from our servers.
              {transactionId}
            </p>
            <div className="alert alert-warning">
              This will permanently delete this account and remove this account
              data from our servers.s
            </div>
            <div className="mt-4 d-flex justify-content-end gap-2">
              <button
                className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </button>
              <button
                className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                onClick={handleReverseTransaction}
              >
                Reverse Transaction
              </button>
            </div>
          </div>
        ) : (
          <div className="w-100">
            {feedback.message && (
              <div
                className={`alert ${
                  feedback.type === "error" ? "alert-warning" : "alert-success"
                } font-size-sm`}
              >
                {feedback.message}
              </div>
            )}
            <div className="mt-4 d-flex justify-content-end gap-2">
              <button
                className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
                onClick={handleClose}
              >
                Close
              </button>
              {feedback.type === "error" && (
                <button
                  className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                  onClick={handleReverseTransaction}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
        </>
    )
  }
 function TransactionDetails({ row_id:transactionId, handleClose }){
    return(
        <>
         <span>{transactionId}</span>
        </>
    )
 }