import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
import { useFetchExpensesDetailsQuery, useFetchSchoolExpensesQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, { renameKeys, sumAttribute, formatNumber, formatDate  } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
function Schoolexpenses(){
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  }
  const navBarOptions = {
    route_data: [
        {
            lable:"School Expenses",
            icon:"streamline:payment-cash-out-3",
            route:"/school-expenses"
        },
        {
           lable:"Financial Analysis",
           route:"/financial-analysis",
           icon:"fluent-mdl2:financial"
        },
        {
           lable:"Financial Anaysis",
            icon:"fluent-mdl2:financial",
           route:"/school-timetable"
        }
    ],
}
const [colDefs, setColDefs] = useState([
  {
     field:"id",
     hide:true
  },
  { field: "Title", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
      cellStyle:cellStyle
   },
  { field: "Amount", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
      cellStyle:cellStyle
   },
  { field: "Category", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
      cellStyle:cellStyle
   },
  { field: "Description", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
      cellStyle:cellStyle
   },
  { field: "Date", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
      cellStyle:cellStyle
   },
  { field: "Action",
    cellRenderer:DropdownComponent,
    cellStyle:cellStyle
   }
]);
const { data: expenses_data, error, isLoading } = useFetchSchoolExpensesQuery();
const filter_array_keys = [
  "id",
  "title",
  "amount",
  "schoolexpensescategory.names",
  "description",
  "date",
];
const renameMapping = {
  "title": "Title",
  "amount": "Amount",
  "schoolexpensescategory.names": "Category",
  "description": "Description",
  "date": "Date"
};

if (isLoading) {
  return <Pageloaderspinner />;
}
    return(
        <>
        <Navbar 
         options={navBarOptions}
        />
         <div>
           <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Spending</p>
                  <h1 className="fw-bolder my-0">₣ {formatNumber(sumAttribute(expenses_data.expenses_data, 'amount'))}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Expense"
                    route="/create-expense"
                    bg="green-bg"
                  />
                </div>
              </div>
              <div>
                <Table 
                    colDefs={colDefs}
                    rowData={renameKeys(
                      CleanArrayData(expenses_data.expenses_data, filter_array_keys),
                      renameMapping
                    )}
                />
              </div>
        </div>
        </>
    )
}
export default Schoolexpenses;

function Update(){
  return(
    <>
    </>
  )
}

function Delete(){
  return(
    <>
    </>
  )
}

function Details({ row_id }){
  const { data:expenses_details, isLoading, error } = useFetchExpensesDetailsQuery({
    expense_id: row_id
  })
  useEffect(() => {
    if (expenses_details) {
      console.table(
        expenses_details.expenses_details
      );
    }
    if (error) {
      console.error("Error fetching parents:", error);
    }
  }, [expenses_details, error]); 
  
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return(
    <>
       <div className="w-100 mt-2">
      <p className="font-size-sm gainsboro-color my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Dolorum id excepturi cumque facere, asperiores
      </p>
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
          <p className="my-0">{expenses_details.expenses_details[0].title}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Expenses Title
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
          <p className="my-0">{formatNumber(Number(expenses_details.expenses_details[0].amount))}$</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Amount
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
          <p className="my-0">{formatDate(expenses_details.expenses_details[0].date)}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Date of spending
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
          <p className="my-0">{expenses_details.expenses_details[0].description}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Descriptions
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
          <p className="my-0">{expenses_details.expenses_details[0].schoolexpensescategory.names}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Descriptions
          </p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end my-2 w-100">
        <button className="border-none rounded-3  w-25 p-2 text-white primary-background text-white">
          Close
        </button>
      </div>
      </div>
    </>
  )
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
      modalTitle:"Expenses Details",
      actionTitle:"Details",
      modalContent:Details
    },
    {
     modalTitle: "Delete Expenses",
     actionTitle: "Delete",
     modalContent: Delete,
    }
 ]
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id}/>
    </>
  );
}