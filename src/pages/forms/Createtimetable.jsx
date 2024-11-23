import Greenbutton from "../../components/Buttons";
import { Icon } from "@iconify/react";
import { useState } from "react";
function Createtimetable() {
  const data = [
    {
      teacher_name: "John Doe",
      start_time: "8:00am",
      end_time: "11:30am",
    },
    {
      teacher_name: "Jane Smith",
      start_time: "9:00am",
      end_time: "12:00pm",
    },
    {
      teacher_name: "Alice Brown",
      start_time: "10:00am",
      end_time: "1:00pm",
    },
  ];

  const [rowCount, setRowCount] = useState(data);

  function addRow(index) {
    const newRow = {
      teacher_name: "New Teacher",
      start_time: "New Start Time",
      end_time: "New End Time",
    };

    setRowCount((prevRowCount) => {
      const updatedRowCount = [...prevRowCount];
      updatedRowCount.splice(index, 0, updatedRowCount[index]);
      return updatedRowCount;
    });
  }

  function removeRow(index) {
    setRowCount(prevRowCount => {
        const updatedRowCount = [...prevRowCount];
        updatedRowCount.splice(index, 1);
        return updatedRowCount;
    });
}
  return (
    <>
      <div className="w-100 height-100 d-flex flex-column align-items-center pt-2 ">
        <div className="d-flex flex-row justify-content-between w-100 my-1 align-items-center">
          <div>
            <h5 className="fw-semibold">Create Timetable</h5>
          </div>
          <div className="d-flex flex-row gap-3">
            <button className="border-none font-size-sm rounded-2 px-3 py-2 d-flex flex-row gap-3 green-bg fw-medium">
              Create And Publish
            </button>
            <button className="border-none font-size-sm rounded-2 px-3 py-2 d-flex flex-row gap-3 primary-background-100 fw-medium">
              <span>
                <Icon icon="ion:arrow-back" className="fs-5" />
              </span>
              <span>Back</span>
            </button>
          </div>
        </div>
        <div className="card rounded-3 mt-2 w-100 py-2 d-flex flex-row justify-content-center px-1 timetable-container">
          <table className="w-100">
            <thead className="text-center font-size-sm rounded-3 gainsboro-color timetable-head">
              <tr>
                <th></th>
                <th className="text-start">Course Name</th>
                <th>Instructor</th>
                <th>Teacher Availaibility Time</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="font-size-md gainsboro-color">
              {rowCount.map((item, index) => {
                return (
                  <tr className="timetable-row" key={`row-${index}`}>
                    <td>
                      <button
                        className="border-none transparent-bg fs-5 gainsboro-color"
                        onClick={() => {
                          addRow(index);
                        }}
                      >
                        <Icon icon="ic:baseline-plus" />
                      </button>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="course name"
                        
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.teacher_name}
                      />
                    </td>
                    <td className="text-center">
                      <div>
                        <span>8:10AM</span>
                        <span>-</span>
                        <span>12:00</span>
                      </div>
                    </td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                    <td>
                      <input type="time" className="form-control" />
                    </td>
                    <td>
                      <input type="time" className="form-control" />
                    </td>
                    <td>
                      <button 
                      className="border-none transparent-bg fs-5 gainsboro-color"
                      onClick={() => {
                         removeRow(index)
                      }}
                      >
                        <Icon icon="tabler:trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Createtimetable;
