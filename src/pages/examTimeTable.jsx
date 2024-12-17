import Navbar from "../components/Navbar";
import CustomDropdown from "../components/Dropdowns";
import { SchoolYearSelector } from "../components/yearPicker";
import { Icon } from "@iconify/react";
function ExamTimeTable(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Specialty Timetable",
                icon:"tabler:category-2",
                route:"/time-table"
            },
            {
               lable:"Exam Timetable",
               route:"/exam-timetable",
               icon:"healthicons:i-exam-multiple-choice-outline" 
            },
            {
               lable:"School Timetable",
               icon:"teenyicons:school-outline",
               route:"/school-timetable"
            }
        ],
    }
    const [isSelected, setIselected] = useState("day");
    return(
        <>
         <Navbar 
          options={navBarOptions}
         />
           <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-fl py-2 px-2 d-flex flex-row align-items-center justify-content-center gap-3 rounded-3 align-items-center gap-2">
                <button className="border-none bg-white d-flex justify-content-center align-items-center" style={{ width:"3rem", height:"3rem", borderRadius:"3rem" }}>
                <Icon icon="akar-icons:schedule"  className="fs-5 color-primary"/>
                </button>
                <h5 className="my-0 fw-semibold">Exam Time Table</h5>
            </div>
            <div className="d-flex flex-row gap-2">
                <button className="border-none green-bg rounded-3 p-2 text-white font-size-sm">
                    Create Time Table
                </button>
            </div>
         </div>
         <div className="card py-2 rounded-4 w-100">
        <div className="d-flex flex-row justify-content-between mx-2">
          <div className="d-flex flex-row gap-2 align-items-center">
            <div>
              <SchoolYearSelector />
            </div>
            <div>
              <SchoolYearSelector />
            </div>
            <div>
              <CustomDropdown />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center gap-3">
            <button
              className="border-none d-flex justify-content-center align-items-center timetable-cards color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="material-symbols:download" />
            </button>
            <button
              className="border-none p-2 rounded-3 font-size-sm color-primary bg-white fill-hover"
              style={{ outline: "1px solid #0285C6" }}
            >
              Update Timetable
            </button>
          </div>
        </div>
        <div className="table-container w-100">
        <table className="mt-1 custom-table">
        <thead>
      <tr>
        <td className="first-column border-top">
          <p className="rotate-90 text-center my-0">Days</p>
        </td>
        <td className="border-top">
          <p className="mt-3">Courses</p>
        </td>
      </tr>
      </thead>
      <tbody className="scrollable-table">
            <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
          <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
          <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
          <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
          <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
           <tr >
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                
              >
                <p className="my-0 text-end font-size-sm">Monday</p>
                <p className="my-0 text-end font-size-sm">
                    <span>12th sept 2024</span>
                </p>
              </div>
            </td>
            <td>
              <td>
              <div className="d-flex flex-row align-items-center justify-content-between"
               style={{ width:"70vw" }}
              >
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between gap-4 flex-row">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards" 
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Engineering Maths</p>
                    <p className=" my-0 font-size-sm">
                      <Icon icon="simple-line-icons:options" />
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="my-0 font-size-sm text-wrap">
                      Mr.John Doe
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary" >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary">
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
                </div>
              </div>
              </td>
            </td>
          </tr>
      </tbody>
        </table>
        </div>
      </div>
        </>
    )
}
export default ExamTimeTable;