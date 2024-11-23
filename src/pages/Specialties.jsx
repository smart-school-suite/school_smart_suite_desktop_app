import Navbar from "../components/Navbar";
import { useFetchSpecialtiesQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData from "../utils/functions";
import { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
function Specialties(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Specialties",
            icon:null,
            route:"/specialties"
        },
        {
           lable:"Academic Analysis",
           icon:null,
           route:"/academic-analysis"
        },
        {
          lable:"Financial Analysis",
          route:"/financial-analysis",
          icon:null
       }
    ],
}
  const [colDefs, setColDefs] = useState([
    { field: "Specialty Name", filter: true, floatingFilter: true },
    { field: "Registration Fee", filter: true, floatingFilter: true },
    { field: "School Fee", filter: true, floatingFilter: true },
    { field: "Level Name", filter: true, floatingFilter: true },
    { field: "Level", filter: true, floatingFilter: true },
  ]);
  const { data: specialty, error, isLoading } = useFetchSpecialtiesQuery();
  const filter_array_keys = [
    "specialty_name",
    "registration_fee",
    "level.name",
    "level.level",
    "school_fee"
  ];
  const renameMapping = {
    "specialty_name": "Specialty Name",
    "registration_fee": "Registration Fee",
    "level.name": "Level Name",
    "level.level": "Level",
    "school_fee": "School Fee"
  };
  useEffect(() => {
    if (specialty) {
      console.table(
        renameKeys(
          CleanArrayData(specialty.specialty, filter_array_keys),
          renameMapping
        )
      );
    }
    if (error) {
      console.error("Error fetching specialty:", error);
    }
  }, [specialty, error]); 

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
                  <p className="font-size-xs my-0">Total Number specialties</p>
                  <h1 className="fw-bold my-0">{specialty.specialty.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create New Specialty"
                    bg="green-bg"
                    route="/create-specialty"
                  />
                </div>
              </div>
              <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(specialty.specialty, filter_array_keys),
            renameMapping
          )}
        />
        </div>
        </>
    )
}
export default Specialties;