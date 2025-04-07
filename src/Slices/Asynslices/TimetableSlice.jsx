import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
const TimetableSlice = createSlice({
  name: "timetable",
  initialState: {
    formData: [],
    courseData: [],
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload.map((item) => ({
        ...item,
        validation: {
          start_time: null,
          end_time: null,
          clash: null,
          valid: null, 
        },
      }));
    },
    setCourseData: (state, action) => {
      const courses = action.payload.map((item) => ({
        ...item,
      }));
      state.courseData = courses; 
    },
    addRow: (state, action) => {
      const index = action.payload.index; // make sure the index is defined or passed correctly
      const findTimetable = state.formData[index];
      
      if (findTimetable.start_time === "" || findTimetable.end_time === "" || findTimetable.course_id === "") {
        toast.custom(<ToastWarning 
          title={"Oops Can't Add Row"}
          description={"Couldn't add row since the parent row data has not been set yet"}
        />);
        return;
      }
      
      const newRow = {
        ...action.payload.row,
        validation: {
          start_time: null,
          end_time: null,
          clash: null,
          valid: null,
        },
      };
    
      // This creates a new array rather than mutating the existing one
      state.formData = [
        ...state.formData.slice(0, index + 1),
        newRow,
        ...state.formData.slice(index + 1),
      ];
    },
    removeRow: (state, action) => {
      const index = action.payload.index;
      state.formData.splice(index, 1);
    },
    updateField: (state, action) => {
      const { index, field, value } = action.payload;

      state.formData[index] = {
          ...state.formData[index],
          [field]: value,
      };
  
      if (field === "course_id") {
          const findCourse = state.courseData.find((item) => item.id === value);
          if (findCourse) {
              const courseTitle = findCourse.course_title;
  
              if (courseTitle) {
                  state.formData[index].course_title = courseTitle;
              }
          }
      }
  
      if (["start_time", "end_time", "day"].includes(field)) {
          validateRow(state, index);
      }
  },
    
  },
});

const validateRow = (state, updatedIndex) => {
  const currentRow = state.formData[updatedIndex];
  const day = currentRow.day;
  const startTime = currentRow.start_time;
  const endTime = currentRow.end_time;

  // Initialize validation states
  currentRow.validation.start_time = null;
  currentRow.validation.end_time = null;
  currentRow.validation.clash = null;
  currentRow.validation.valid = null;

  // Check for required fields
  if (!startTime || !endTime || !day) {
      return; // If required fields are missing, we finish here
  }

  // Get availability times
  //const availableStartTime = currentRow.available_start_time; // Assume these exist in the row
 // const availableEndTime = currentRow.available_end_time; // Assume these exist in the row

  // Check if start and end times fall within the available range
 //if (startTime <= availableStartTime || startTime >= availableEndTime) {
      //currentRow.validation.start_time = "Teacher is not available at this start time.";
 // }
 // if (endTime <= availableStartTime || endTime >= availableEndTime) {
     // currentRow.validation.end_time = "Teacher is not available at this end time.";
  //}

  // If either start or end time is invalid, we exit the function early
  //if (currentRow.validation.start_time || currentRow.validation.end_time) {
    //  return; 
  //}

  let clashFound = false;

  // Check for time clashes with other rows
  for (let i = 0; i < state.formData.length; i++) {
      if (i !== updatedIndex) {
          const compareRow = state.formData[i];
          if (compareRow.day === day) {
              if (
                  (startTime >= compareRow.start_time && startTime < compareRow.end_time) ||
                  (endTime > compareRow.start_time && endTime <= compareRow.end_time) ||
                  (startTime <= compareRow.start_time && endTime >= compareRow.end_time)
              ) {
                  clashFound = true;
                  currentRow.validation.clash = "Time slot clashes with another teacher's schedule.";
                  compareRow.validation.clash = "Time slot clashes with another teacher's schedule.";
              }
          }
      }
  }

  // If a clash was found, update the current row's validation
  if (clashFound) {
      currentRow.validation.start_time = "Clash detected!";
      currentRow.validation.end_time = "Clash detected!";
  } else {
      currentRow.validation.valid = "Looks good!";
  }
};

export const { setFormData, addRow, removeRow, setCourseData, updateField } = TimetableSlice.actions;
export default TimetableSlice.reducer;