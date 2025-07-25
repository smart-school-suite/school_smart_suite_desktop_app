import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning"; // Make sure path is correct
import ToastSuccess from "../../components/Toast/ToastSuccess"; // Assuming you have a success toast

// Helper function to convert time strings (e.g., "9:40 AM") to a comparable format (minutes from midnight)
const timeToMinutes = (timeStr) => {
    if (!timeStr) return null;
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period && period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period && period.toLowerCase() === 'am' && hours === 12) {
        hours = 0; // Midnight 12 AM
    }
    return hours * 60 + minutes;
};

// Helper function to calculate duration
const calculateDuration = (startTimeStr, endTimeStr) => {
    const startMinutes = timeToMinutes(startTimeStr);
    const endMinutes = timeToMinutes(endTimeStr);

    if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
        return ""; // Return empty if times are invalid or end time is not after start time
    }

    let durationMinutes = endMinutes - startMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    let durationString = "";
    if (hours > 0) {
        durationString += `${hours}h`;
    }
    if (minutes > 0) {
        if (durationString.length > 0) durationString += " ";
        durationString += `${minutes}m`;
    }
    return durationString || ""; // Return empty string if duration is 0
};


const TimetableSlice = createSlice({
    name: "timetable",
    initialState: {
        formData: [],
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
                    availability_check: null,
                },
                course_id: item.course_id || "",
                day: item.day || "",
                start_time: item.start_time || "",
                end_time: item.end_time || "",
                duration: item.duration || "",
            }));
            state.formData.forEach((_, index) => validateRow(state, index));
        },
        addRow: (state, action) => {
            const index = action.payload.index;
            const findTimetable = state.formData[index];

            if (!findTimetable.start_time || !findTimetable.end_time || !findTimetable.course_id || !findTimetable.day) {
                toast.custom(<ToastWarning
                    title={"Oops Can't Add Row"}
                    description={"Please fill in Day, Course, Start Time, and End Time for the current row before adding a new one."}
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
                    conflictWith: [],
                    availability_check: null,
                },
                course_id: "",
                day: "",
                start_time: "",
                end_time: "",
                duration: "",
            };

            state.formData.splice(index + 1, 0, newRow);

            state.formData.forEach((_, idx) => validateRow(state, idx));
            toast.custom(<ToastSuccess
                title={"Row Added!"}
                description={"New row added successfully."}
            />);
        },
        removeRow: (state, action) => {
            const index = action.payload.index;
            if (state.formData.length === 1) {
                toast.custom(<ToastWarning
                    title={"Cannot Remove Last Row"}
                    description={"You cannot remove the only remaining row."}
                />);
                return;
            }
            state.formData.splice(index, 1);
            state.formData.forEach((_, idx) => validateRow(state, idx));
            toast.custom(<ToastSuccess
                title={"Row Removed!"}
                description={"Row removed successfully."}
            />);
        },
        updateField: (state, action) => {
            const { index, field, value } = action.payload;

            state.formData[index] = {
                ...state.formData[index],
                [field]: value,
            };

            // Calculate duration if start_time or end_time changes
            if (field === "start_time" || field === "end_time") {
                const currentRow = state.formData[index];
                currentRow.duration = calculateDuration(currentRow.start_time, currentRow.end_time);
            }

            // Revalidate the current row and all other rows if day/time fields change
            if (["start_time", "end_time", "day"].includes(field)) {
                // Clear validation for all rows before revalidating
                state.formData.forEach(item => {
                    item.validation.clash = null;
                    item.validation.valid = null;
                    item.validation.conflictWith = [];
                    item.validation.availability_check = null;
                    item.validation.start_time = null;
                    item.validation.end_time = null;
                });
                state.formData.forEach((_, idx) => validateRow(state, idx));
            }
        },
    },
});

// --- Validation Logic (Outside of slice for cleaner separation) ---

const validateRow = (state, updatedIndex) => {
    const currentRow = state.formData[updatedIndex];

    // Reset validation for current row
    currentRow.validation.start_time = null;
    currentRow.validation.end_time = null;
    currentRow.validation.clash = null;
    currentRow.validation.valid = null;
    currentRow.validation.conflictWith = [];
    currentRow.validation.availability_check = null;


    const { day, start_time, end_time, teacher_id, availableTime } = currentRow;

    // 1. Basic field presence check
    if (!day || !start_time || !end_time) {
        currentRow.validation.valid = "Incomplete"; // Mark as incomplete
        return;
    }

    // Convert current row times for easier comparison
    const currentStartMinutes = timeToMinutes(start_time);
    const currentEndMinutes = timeToMinutes(end_time);

    // Basic time order check (end time after start time)
    if (currentStartMinutes === null || currentEndMinutes === null || currentStartMinutes >= currentEndMinutes) {
        currentRow.validation.end_time = "End time must be after start time.";
        currentRow.validation.valid = false;
        // Do NOT return here, allow availability check to run so we can prioritize error message.
    }

    // 2. Validate against teacher's available time ranges for the selected day
    const teacherAvailabilityForDay = availableTime.filter(av => av.day === day);
    let withinAvailability = false;

    if (teacherAvailabilityForDay.length === 0) {
        currentRow.validation.availability_check = "Teacher has no availability defined for this day.";
        currentRow.validation.valid = false;
    } else {
        for (const avSlot of teacherAvailabilityForDay) {
            const avStartMinutes = timeToMinutes(avSlot.start_time);
            const avEndMinutes = timeToMinutes(avSlot.end_time);

            if (currentStartMinutes >= avStartMinutes && currentEndMinutes <= avEndMinutes) {
                withinAvailability = true;
                break;
            }
        }

        if (!withinAvailability) {
            currentRow.validation.availability_check = "Time slot is outside teacher's defined availability for this day.";
            currentRow.validation.valid = false;
        }
    }


    // --- NEW TOAST LOGIC FOR AVAILABILITY AND TIME ORDER ---
    // If there's an end_time validation error (time order) or an availability error
    if (currentRow.validation.end_time || currentRow.validation.availability_check) {
        currentRow.validation.valid = false; // Confirm invalid status
        const description = currentRow.validation.end_time || currentRow.validation.availability_check;
        toast.custom(
            <ToastWarning
                title={"Validation Error"}
                description={description}
            />
        );
        return; // Exit early as a primary validation issue is found
    }
    // --- END NEW TOAST LOGIC ---


    // 3. Check for time clashes with other rows (only same teacher on same day)
    let clashFound = false;
    let conflictWithIndices = [];

    state.formData.forEach((compareRow, i) => {
        if (i === updatedIndex) return;

        if (compareRow.day === day) {
            if (checkOverlap(start_time, end_time, compareRow.start_time, compareRow.end_time)) {
                if (compareRow.teacher_id === teacher_id) {
                    clashFound = true;
                    if (!conflictWithIndices.includes(i)) conflictWithIndices.push(i);
                    // Also mark the conflicting row
                    if (!compareRow.validation.conflictWith.includes(updatedIndex)) {
                        compareRow.validation.conflictWith.push(updatedIndex);
                        compareRow.validation.clash = "Clash detected with another schedule for this teacher.";
                        compareRow.validation.valid = false; // Mark conflicting row as invalid
                        // Do NOT toast here for the compareRow, let it be handled when its turn comes in the forEach loop
                    }
                }
            }
        }
    });

    if (clashFound) {
        currentRow.validation.clash = "Time slot clashes with other schedules.";
        currentRow.validation.conflictWith = conflictWithIndices;
        currentRow.validation.valid = false;
        // --- NEW TOAST LOGIC FOR CLASHES ---
        toast.custom(
            <ToastWarning
                title={"Clash Detected!"}
                description={currentRow.validation.clash}
            />
        );
        // --- END NEW TOAST LOGIC ---
    } else {
        currentRow.validation.valid = true;
        toast.custom(<ToastSuccess
            title={"Timetable Valid!"}
            description={"The current entry is valid and has no clashes."}
            />);
    }
};

export const { setFormData, addRow, removeRow, updateField } = TimetableSlice.actions;
export default TimetableSlice.reducer;