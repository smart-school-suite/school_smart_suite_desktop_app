import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";

const isTimeOverlap = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && aEnd > bStart;
};

// Helper function to calculate duration in minutes
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return null;
  }
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startDate = new Date(0, 0, 0, startHour, startMinute);
  const endDate = new Date(0, 0, 0, endHour, endMinute);

  if (endDate <= startDate) {
    return "Invalid Time";
  }

  const diffInMinutes = (endDate - startDate) / (1000 * 60);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  let durationString = "";
  if (hours > 0) {
    durationString += `${hours}h `;
  }
  if (minutes > 0) {
    durationString += `${minutes}min`;
  }
  return durationString.trim();
};

const specialtyTimetableSlice = createSlice({
  name: "createSpecialtyTimetable",
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
          conflictWith: [],
        },
      }));
    },
    updateFormRow: (state, action) => {
      const { index, key, value } = action.payload;
      if (!state.formData[index]) return;

      state.formData[index][key] = value;

      // Recalculate duration and update validation for the current row
      const currentRow = state.formData[index];
      currentRow.duration = calculateDuration(currentRow.start_time, currentRow.end_time);

      if (key === "start_time" || key === "end_time" || key === "day") {
        const rowStart = currentRow.start_time;
        const rowEnd = currentRow.end_time;
        let conflicts = [];

        // Update validation for all rows, as a change in one can affect others.
        state.formData.forEach((row, i) => {
          let rowConflicts = [];
          const otherStart = row.start_time;
          const otherEnd = row.end_time;

          // Check for conflicts with every other row
          state.formData.forEach((otherRow, j) => {
            if (i === j) return;
            if (row.day === otherRow.day && row.day && row.start_time && row.end_time && otherRow.start_time && otherRow.end_time) {
              if (isTimeOverlap(row.start_time, row.end_time, otherRow.start_time, otherRow.end_time)) {
                rowConflicts.push(j);
              }
            }
          });

          // Update validation for the current row being iterated
          row.validation = {
            start_time: !!row.start_time,
            end_time: !!row.end_time,
            clash: rowConflicts.length > 0,
            valid: rowConflicts.length > 0 ? "Time Clash Detected" : "Looks Good",
            conflictWith: rowConflicts,
          };
        });
      }
    },
    addRow: (state, action) => {
      const index = action.payload.index;
      const findTimetable = state.formData[index];

      if (
        findTimetable.start_time === "" ||
        findTimetable.end_time === "" ||
        findTimetable.course_id === "" ||
        findTimetable.teacher_id === "" ||
        findTimetable.day === ""
      ) {
        toast.custom(
          <ToastWarning
            title={"Oops Can't Add Row"}
            description={
              "Couldn't add row since the parent row data has not been set yet"
            }
          />
        );
        return;
      }
      const newRow = {
        ...action.payload.row,
        teacher_id: "",
        course_id: "",
        day: "",
        start_time: "",
        end_time: "",
        duration: "",
        validation: {
          start_time: null,
          end_time: null,
          clash: null,
          valid: null,
          conflictWith: [],
        },
      };

      state.formData.splice(index + 1, 0, newRow);
    },
    removeRow: (state, action) => {
      const index = action.payload.index;
      state.formData.splice(index, 1);
      
      state.formData.forEach((row, i) => {
        let rowConflicts = [];
        state.formData.forEach((otherRow, j) => {
          if (i === j) return;
          if (row.day === otherRow.day && row.day && row.start_time && row.end_time && otherRow.start_time && otherRow.end_time) {
            if (isTimeOverlap(row.start_time, row.end_time, otherRow.start_time, otherRow.end_time)) {
              rowConflicts.push(j);
            }
          }
        });
        row.validation = {
          start_time: !!row.start_time,
          end_time: !!row.end_time,
          clash: rowConflicts.length > 0,
          valid: rowConflicts.length > 0 ? "Time Clash Detected" : "Looks Good",
          conflictWith: rowConflicts,
        };
      });
    },
  },
});

export const { setFormData, updateFormRow, addRow, removeRow } =
  specialtyTimetableSlice.actions;
export default specialtyTimetableSlice.reducer;