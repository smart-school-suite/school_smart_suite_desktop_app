import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
import { useFetchStudentsQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData from "../utils/functions";
import { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
function Feepayment(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Fee Payments",
            icon:null,
            route:"/fee-payments"
        },
        {
           lable:"Financial Analysis",
           route:"/financial-analysis",
           icon:null
        },
        {
           lable:"Transactions",
           icon:null,
           route:"/fee-payment/transactions"
        }
    ],
}
const [colDefs, setColDefs] = useState([
  { field: "Student Name", filter: true, floatingFilter: true },
  { field: "Level", filter: true, floatingFilter: true },
  { field: "Specialty", filter: true, floatingFilter: true },
  { field: "Parent name", filter: true, floatingFilter: true },
  { field: "First Reachable Number", filter: true, floatingFilter: true },
  { field: "Second Reachable Number", filter: true, floatingFilter: true },
  { field: "Gender", filter: true, floatingFilter: true },
  { field: "Fee status", filter: true, floatingFilter: true },
  { field: "Fee Debt", filter: true, floatingFilter: true },
]);
const { data: students, error, isLoading } = useFetchStudentsQuery();
const filter_array_keys = [
  "specialty.specialty_name",
  "parents.name",
  "level.name",
  "name",
  "phone_one",
  "phone_two",
  "gender",
  "fee_status",
  "total_fee_debt",
];
const renameMapping = {
  "specialty.specialty_name": "Specialty",
  "parents.name": "Parent name",
  "level.name": "Level",
  "name": "Student Name",
  "phone_one": "First Reachable Number",
  "phone_two": "Second Reachable Number",
  "fee_status": "Fee status",
  "total_fee_debt": "Fee Debt",
  "gender": "Gender",
};
useEffect(() => {
  if (students) {
    console.table(
      renameKeys(
        CleanArrayData(students.students, filter_array_keys),
        renameMapping
      )
    );
  }
  if (error) {
    console.error("Error fetching students:", error);
  }
}, [students, error]); 

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
                  <p className="font-size-xs my-0">Total Indepted Students</p>
                  <h1 className="fw-bolder my-0">4500</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Pay Fees"
                    route="/create-feepayment"
                    bg="green-bg"
                  />
                </div>
              </div>
              <div>
              <Table 
                    colDefs={colDefs}
                    rowData={renameKeys(
                      CleanArrayData(students.students, filter_array_keys),
                      renameMapping
                    )}
                />
              </div>
        </div>
        </>
    )
}
export default Feepayment;