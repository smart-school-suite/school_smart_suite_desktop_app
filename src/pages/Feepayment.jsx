import Navbar from "../components/Navbar";
import {
  useFetchStudentDetailsQuery,
  useFetchFeeDebtorsQuery,
} from "../Slices/Asynslices/fetchSlice";
import {  useState } from "react";
import { formatNumber } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { Icon } from "@iconify/react";
import { useAddFeePaymentTransactionMutation } from "../Slices/Asynslices/postSlice";
import { FeePaymentnavBarOptions } from "../componentConfigurations/navBarConfig";
import toast from "react-hot-toast";
function Feepayment() {
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
      headerName:"Student Name",
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      filter: true,
      headerName:"Level",
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
      field: "fee_status",
      filter: true,
      headerName:"Fee status",
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "total_fee_debt",
      filter: true,
      headerName:"Fee Debt",
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
  const { data: fee_debtors, error, isLoading } = useFetchFeeDebtorsQuery();

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={FeePaymentnavBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Indepted Student</p>
            <h1 className="fw-bold my-0">{fee_debtors.fee_debtors.length}</h1>
          </div>
        </div>
      </div>
      <Table
        colDefs={colDefs}
        rowData={fee_debtors.fee_debtors}
      />
    </>
  );
}
export default Feepayment;

function Update() {
  return <></>;
}

function Details({ row_id }) {
  const {
    data: student_details,
    isLoading,
    error,
  } = useFetchStudentDetailsQuery({
    student_id: row_id,
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100 mt-2">
        <p className="font-size-sm gainsboro-color my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum id
          excepturi cumque facere, asperiores
        </p>
        <span>Fee Debt</span>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {formatNumber(
                Number(student_details.student_details[0].specialty.school_fee)
              )}
              <span> ₣</span>
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Expected Tuition Fee to be paid
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {formatNumber(
                Number(
                  student_details.student_details[0].specialty.school_fee
                ) +
                  Number(
                    student_details.student_details[0].specialty
                      .registration_fee
                  ) -
                  Number(student_details.student_details[0].total_fee_debt)
              )}{" "}
              ₣{" "}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Amount Paid
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-1">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">
            {formatNumber(
              Number(student_details.student_details[0].total_fee_debt)
            )}
            <span> ₣</span>
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Outstanding Debt
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-1">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">
            {student_details.student_details[0].fee_status}
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Fee Debt Status
          </p>
        </div>
      </div>
      <span>Student Details</span>
      <div className="d-flex align-items-center justify-content-between my-1">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{student_details.student_details[0].name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Fee Debt Status
          </p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end my-2 w-100">
        <button className="border-none rounded-3  w-25 p-2 text-white primary-background text-white">
          Close
        </button>
      </div>
    </>
  );
}

function PayStudentFees({ handleClose, row_id }) {
  const [formData, setFormData] = useState({
     student_id:row_id,
     fee_name:"",
     amount:"",
  })
  const [addFeePaymentTransaction] = useAddFeePaymentTransactionMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      await addFeePaymentTransaction(formData).unwrap();
      toast.success("Fees Paid successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to Pay fees. Try again.");
    }
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="block">
          <h5>Student Fees Payment</h5>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt {row_id}
          </span>
        </div>
      </div>
      <div className="my-1">
        <span>Amount</span>
        <input type="number" 
          className="form-control" step="0.01" 
          value={formData.amount}
          placeholder="Enter amount"
          name="amount"
          onChange={(e) => handleInputChange("amount", e.target.value)}
        />
      </div>
      <div className="my-1">
        <span>Fee Type</span>
        <select name="fee_name" id="" className="form-select"
        value={formData.fee_name}
          onChange={(e) => handleInputChange("fee_name", e.target.value)}
        >
           <option value="">select fee type</option>
          <option value="Registration Fee">Registration Fee</option>
          <option value="School Fees">School Fees</option>
        </select>
      </div>
      <div className="my-1">
        <span>Message</span>
        <textarea name="" id="" className="form-control">
        </textarea>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button 
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={() => {
              handleSubmit();
            }}
            >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

function Amount(props){
   return (<span>{formatNumber(Number(props.value))} ₣</span>)
}

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Expenses",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Expenses Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Pay student fees",
      actionTitle: "Pay Fees",
      modalContent: PayStudentFees,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
