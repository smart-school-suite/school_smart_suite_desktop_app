import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchExamAssociateTimetableCoursesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAddExamTimetableMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import Navbar from "../../components/Navbar";
import { ExamResitNavbarOptions } from "../../componentConfigurations/navBarConfig";
import toast from "react-hot-toast";

export function CreateExamTimeTable() {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const {
    data: associated_courses,
    isLoading: isExamCoursesLoading,
  } = useFetchExamAssociateTimetableCoursesQuery({ exam_id });
  const [addExamTimetable] = useAddExamTimetableMutation();
  
  const [examCourses, setExamCourses] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedInputs, setTouchedInputs] = useState(Array(3).fill(false));

  useEffect(() => {
    if (associated_courses?.associated_courses) {
      const initialCourses = associated_courses.associated_courses.map(item => ({
        exam_id: item.exam_id,
        specialty_id: item.specialty_id,
        course_id: item.course_id,
        level_id: item.level_id,
        day: "",
        start_time: "",
        end_time: "",
      }));
      setExamCourses(initialCourses);
    }
  }, [associated_courses]);

  const handleGradeChange = (index, field, value) => {
    setExamCourses(prevExamCourses => {
      const updatedCourses = [...prevExamCourses];
      updatedCourses[index] = { ...updatedCourses[index], [field]: value };
      setValidationErrors(validateOverlap(updatedCourses));
      return updatedCourses;
    });

    setTouchedInputs(prev => {
      const updatedTouchedInputs = [...prev];
      updatedTouchedInputs[index] = true;
      return updatedTouchedInputs;
    });
  };

  const validateOverlap = (courses) => {
    const errors = {};
    courses.forEach((course, index) => {
      const { day, start_time, end_time } = course;
      if (day && start_time && end_time) {
        courses.forEach((otherCourse, otherIndex) => {
          if (index !== otherIndex && otherCourse.day === day) {
            const hasOverlap = otherCourse.start_time < end_time && start_time < otherCourse.end_time;
            if (hasOverlap) {
              errors[`courses[${index}].start_time`] = "Time clash detected.";
              errors[`courses[${index}].end_time`] = "Time clash detected.";
            }
          }
        });
      }
    });
    return errors;
  };

  const handleSubmit = async () => {
    const payload = {
      exam_courses: examCourses.map(items => ({
        exam_id: items.exam_id,
        specialty_id: items.specialty_id,
        course_id: items.course_id,
        level_id: items.level_id,
        day: items.day,
        start_time: items.start_time,
        end_time: items.end_time,
      })),
    };

    try {
      await addExamTimetable(payload).unwrap();
      toast.success("Time Table Created successfully!");
      navigate("/exam-timetable");
    } catch (error) {
      toast.error("Failed to Create Time table. Try again.");
    }
  };

  if (isExamCoursesLoading) return <Pageloaderspinner />;
  
  return (
    <>
      <Navbar options={ExamResitNavbarOptions} />
      <div className="w-100 height-100 d-flex flex-column align-items-center pt-2 ">
        <div className="d-flex flex-row justify-content-between w-100 my-1 align-items-center">
          <h5 className="fw-semibold">Create Timetable</h5>
          <button
            className="border-none font-size-sm rounded-2 text-white px-3 py-2 green-bg fw-medium"
            onClick={handleSubmit}
          >
            Create And Publish
          </button>
        </div>
        <div className="card rounded-3 mt-2 w-100 py-2 d-flex flex-row justify-content-center px-1 timetable-container">
          <table className="w-100">
            <thead className="text-center font-size-sm rounded-3 gainsboro-color timetable-head">
              <tr>
                <th className="text-start">Course Name</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody className="font-size-md gainsboro-color">
              {associated_courses.associated_courses.map((item, index) => (
                <tr className="timetable-row" key={`row-${index}`}>
                  <td>{item.course_name}</td>
                  <td>
                    <CustomDateInput
                      value={examCourses[index]?.day || ""}
                      onChange={(e) => handleGradeChange(index, 'day', e.target.value)}
                      touched={touchedInputs[index]} 
                      error={validationErrors[`courses[${index}].day`]}
                    />
                  </td>
                  <td>
                    <CustomTimeInput
                      value={examCourses[index]?.start_time || ""}
                      onChange={(e) => handleGradeChange(index, 'start_time', e.target.value)}
                      touched={touchedInputs[index]} 
                      error={validationErrors[`courses[${index}].start_time`]}
                    />
                  </td>
                  <td>
                    <CustomTimeInput
                      value={examCourses[index]?.end_time || ""}
                      onChange={(e) => handleGradeChange(index, 'end_time', e.target.value)}
                      touched={touchedInputs[index]} 
                      error={validationErrors[`courses[${index}].end_time`]}
                    />
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

export function CustomTimeInput({ value, onChange, touched, error }) {
  return (
    <div>
      <input
        type="time"
        className={`form-control ${touched && error ? 'is-invalid' : touched && value ? 'is-valid' : ''}`}
        value={value}
        onChange={onChange}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
      {touched && !error && value && <div className="valid-feedback">Looks good!</div>}
    </div>
  );
}

export function CustomDateInput({ value, onChange, touched, error }) {
  return (
    <div>
      <input
        type="date"
        className={`form-control ${touched && error ? 'is-invalid' : touched && value ? 'is-valid' : ''}`}
        value={value}
        onChange={onChange}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
      {touched && !error && value && <div className="valid-feedback">Looks good!</div>}
    </div>
  );
}