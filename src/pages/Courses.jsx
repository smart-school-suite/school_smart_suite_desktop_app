import Navbar from "../components/Navbar";
import { useFetchCoursesQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData from "../utils/functions";
import { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
function Courses(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Courses",
            icon:null,
            route:"/courses"
        },
        {
           lable:"Academic Analysis",
           route:"/courses/academic-analysis",
           icon:null
        },
        {
           lable:"Financial Anaysis",
           icon:null,
           route:"/courses/financial-analysis"
        }
    ],
}
  const [colDefs, setColDefs] = useState([
    { field: "Course Code", filter: true, floatingFilter: true },
    { field: "Course Title", filter: true, floatingFilter: true },
    { field: "Credit", filter: true, floatingFilter: true },
    { field: "Semester", filter: true, floatingFilter: true },
    { field: "Specialty Name", filter: true, floatingFilter: true },
    { field: "Level", filter: true, floatingFilter: true },
  ]);
  const { data: courses, error, isLoading } = useFetchCoursesQuery();
  const filter_array_keys = [
    "course_code",
    "course_title",
    "specialty.specialty_name",
    "semester.name",
    "credit",
    "level.level",
  ];
  const renameMapping = {
    "course_code": "Course Code",
    "course_title": "Course Title",
    "credit": "Credit",
    "semester.name":"Semester",
    "specialty.specialty_name": "Specialty Name",
    "level.level": "Level"
  };
  useEffect(() => {
    if (courses) {
      console.table(
        renameKeys(
          CleanArrayData(courses.courses, filter_array_keys),
          renameMapping
        )
      );
    }
    if (error) {
      console.error("Error fetching courses:", error);
    }
  }, [courses, error]); 

  if (isLoading) {
    return <Pageloaderspinner />;
  }
    return(
        <>
        <Navbar
         options={navBarOptions}
        ></Navbar>
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of Courses</p>
                  <h1 className="fw-bold my-0">{courses.courses.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create New Course"
                    bg="green-bg"
                    route="/create-course"
                  />
                </div>
              </div>
              <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(courses.courses, filter_array_keys),
            renameMapping
          )}
        />
        </div>
        </>
    )
}
export default Courses;