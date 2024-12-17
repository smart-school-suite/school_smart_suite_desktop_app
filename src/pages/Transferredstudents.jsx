import Greenbutton from "../components/Buttons";
import { useFetchStudentsQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData from "../utils/functions";
import { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
function Transferredstudents(){
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
      
      if (isLoading) {
        return <Pageloaderspinner />;
      }
    return(
        <>
               <div className="my-2">
          <div className="d-flex align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center" style={{ width:"3rem", height:"3rem", borderRadius:"3rem", background:"#fff" }}>
          <Icon icon="mingcute:transfer-fill" className="fs-5 color-primary"/>
            </div>
            <h4 className="fw-bold my-0">Student Transfers</h4>
          </div>
          </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-flex flex-row align-items-end gap-2">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Student Transfers</p>
                  <h1 className="fw-bold my-0">{students.students.length}</h1>
                </div>
                 
                </div>
                <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Transfer Request"
                    bg="green-bg"
                    route="/create-school-admin"
                  />
                </div>
          </div>
          <div className="pt-4">
          <Table 
                    colDefs={colDefs}
                    rowData={renameKeys(
                      CleanArrayData(students.students, filter_array_keys),
                      renameMapping
                    )}
                />
          </div>
        </>
    )
}
export default Transferredstudents