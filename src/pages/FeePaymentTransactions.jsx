import { FeePaymentnavBarOptions } from "../componentConfigurations/navBarConfig";
import Navbar from "../components/Navbar";
import Table from "../components/Tables";
import { useFetchPaidFeesQuery } from "../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../components/Spinners";
import { useState } from "react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { formatNumber } from "../utils/functions";
function FeePaymentTransactions() {
  const {
    data: fee_payment_records,
    isLoading: isFeePaymentRecordsLoading,
    error: FeePaymentRecordsErrors,
  } = useFetchPaidFeesQuery();
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  };
  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      filter: true,
      headerName: "Student Name",
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      filter: true,
      headerName: "Level",
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
        field: "specailty_name",
        filter: true,
        headerName:"Specialty",
        floatingFilter: true,
        cellRenderer: DataComponent,
        cellStyle: cellStyle,
      },
    {
      field: "fee_name",
      filter: true,
      headerName: "Fee Title",
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      filter: true,
      headerName: "Amount Paid",
      floatingFilter: true,
      cellRenderer: Amount,
      cellStyle: cellStyle,
    },
    {
      field: "Actions",
      filter: true,
      floatingFilter: true,
      cellRenderer: DropdownComponent,
    },
  ]);
  if (isFeePaymentRecordsLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <Navbar options={FeePaymentnavBarOptions} />
      <div>
        <div>
          <div className="d-flex flex-row align-items-center mt-4 w-100">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Transactions</p>
              <h1 className="fw-bold my-0">
                {fee_payment_records.fee_payment_records.length}
              </h1>
            </div>
          </div>
        </div>
        <Table
          colDefs={colDefs}
          rowData={fee_payment_records.fee_payment_records}
        />
      </div>
    </>
  );
}

export default FeePaymentTransactions;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Expenses",
      actionTitle: "Update",
    },
    {
      modalTitle: "Expenses Details",
      actionTitle: "Details",
    },
    {
      modalTitle: "Pay student fees",
      actionTitle: "Pay Fees",
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}

function Amount(props) {
  return <span>{formatNumber(Number(props.value))} ₣</span>;
}
