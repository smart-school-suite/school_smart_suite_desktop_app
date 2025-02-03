import Greenbutton from "../../components/Buttons";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ExamTimeTableNavbarOptions } from "../../componentConfigurations/navBarConfig";
import Pageloaderspinner from "../../components/Spinners";
import {
  useFetchInstructorAvailabilityQuery,
  useFetchSpecailtyCoursesQuery,
} from "../../Slices/Asynslices/fetchSlice";
import { useAddTimeTableMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function CreateTimetable() {
  const { semester_id, specailty_id } = useParams();

  // State to manage form data
  const [formData, setFormData] = useState([]);

  // Fetch specialty courses and instructor availability
  const { data: courses_data, isLoading: isSpecialtyCoursesLoading } =
    useFetchSpecailtyCoursesQuery({
      semester_id,
      specialty_id: specailty_id,
    });

  const {
    data: instructor_availability,
    isLoading: isAvailabilityDataLoading,
  } = useFetchInstructorAvailabilityQuery({
    semester_id,
    specialty_id: specailty_id,
  });

  // Set initial form data based on instructor availability
  useEffect(() => {
    if (instructor_availability?.instructor_availability) {
      const initialAvailability =
        instructor_availability.instructor_availability.map((item) => ({
          teacher_id:item.teacher_id,
          teacher_name: item.teacher_name,
          start_time: item.start_time,
          end_time: item.end_time,
          level_id: item.level_id,
          day: item.day,
          course_id: "",
          semester_id,
          specailty_id,
        }));
      setFormData(initialAvailability);
    }
  }, [instructor_availability, semester_id, specailty_id]);

  // Function to add a new row
  function addRow(index) {
    const newRow = {
      teacher_name: "New Teacher",
      start_time: "00:00",
      end_time: "00:00",
      level_id: "",
      day: "",
      course_id: "",
      semester_id,
      specailty_id,
    };

    setFormData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index + 1, 0, newRow);
      return updatedRows;
    });
  }


  function removeRow(index) {
    setFormData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  }

  const handleCourseChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
    console.log(value);
  };
  
  const [addTimeTable] = useAddTimeTableMutation();
  const handleSubmit = async () => {
    const cleanedData = formData.filter((items) => items.course_id !== "" || null);
    const payload = {
      specailty_timetable: cleanedData.map(item => ({
        teacher_id: item.teacher_id,
        level_id: item.level_id,
        specialty_id: item.specailty_id,
        semester_id: item.semester_id,
        course_id: item.course_id,
        day_of_week: item.day,
        start_time: item.start_time,
        end_time: item.end_time,
      })),
    };

    try {
      await addTimeTable(payload).unwrap();
      toast.success("Time table created  successfully!");
      navigate("/time-table");
    } catch (error) {
      toast.error("Failed to create time table. Try again.");
    }
  };

  if (isAvailabilityDataLoading) return <Pageloaderspinner />;

  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div className="w-100 height-100 d-flex flex-column align-items-center pt-2 ">
        <div className="d-flex flex-row justify-content-between w-100 my-1 align-items-center">
          <h5 className="fw-semibold">Create Timetable</h5>
          <div>
            <button 
             className="border-none text-white font-size-sm rounded-2 px-3 py-2 d-flex flex-row gap-3 green-bg fw-medium"
             onClick={()=>{
               handleSubmit();
             }}
            >
              Create And Publish
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
                <th>Teacher Availability Time</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="font-size-md gainsboro-color">
              {formData.map((item, index) => (
                <tr className="timetable-row" key={`row-${index}`}>
                  <td>
                    <button
                      className="border-none transparent-bg fs-5 gainsboro-color"
                      onClick={() => addRow(index)}
                    >
                      <Icon icon="ic:baseline-plus" />
                    </button>
                  </td>
                  <td style={{ width:"18rem" }}>
                  {isSpecialtyCoursesLoading ? (
                    <select name="" className="form-select">
                      <option value="">loading</option>
                    </select>
                  ) : (
                    <select name="course_id" className="form-select"
                    value={formData[index] ? formData[index].course_id : ""}
                    onChange={(e) => handleCourseChange(index, 'course_id', e.target.value)}
                    >
                      <option disabled>Select Course</option>
                      {
                        courses_data.courses_data.map((items) => {
                           return(
                             <option value={items.id} key={items.id}>{items.course_title}</option>
                           )
                        })
                      }
                    </select>
                  )}
                  </td>
                  <td>
                    {item.teacher_name}
                  </td>
                  <td className="text-center">
                    <div>
                      <span>{item.start_time}</span> -{" "}
                      <span>{item.end_time}</span>
                    </div>
                  </td>
                  <td>
                    <span>{item.day}</span>
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      value={item.start_time}
                      onChange={(e) => {
                        const updatedFormData = [...formData];
                        updatedFormData[index].start_time = e.target.value;
                        setFormData(updatedFormData);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      value={item.end_time}
                      onChange={(e) => {
                        const updatedFormData = [...formData];
                        updatedFormData[index].end_time = e.target.value;
                        setFormData(updatedFormData);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="border-none transparent-bg fs-5 gainsboro-color"
                      onClick={() => removeRow(index)}
                    >
                      <Icon icon="tabler:trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CreateTimetable;
