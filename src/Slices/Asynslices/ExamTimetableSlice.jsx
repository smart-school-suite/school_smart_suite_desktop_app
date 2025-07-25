import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";

// Helper function to convert time strings (HH:MM - 24-hour format) to total minutes from midnight
const timeToMinutes = (timeStr) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to calculate duration string (e.g., "1h 30m")
const calculateDuration = (startTimeStr, endTimeStr) => {
    const startMinutes = timeToMinutes(startTimeStr);
    const endMinutes = timeToMinutes(endTimeStr);

    if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
        return "";
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
    return durationString || "";
};

// Helper to compare dates without time component
const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

const examTimetableSlice = createSlice({
    name: "examtimetable",
    initialState: {
        formData: [],
        startDate: null,
        endDate: null,
    },
    reducers: {
        setData: (state, action) => {
            state.formData = action.payload.map((item) => ({
                ...item,
                validation: {
                    start_time: null,
                    end_time: null,
                    clash: null,
                    dateValid: null,
                    date: null,
                    timeValid: null,
                    overallValid: null, // Overall row validity
                },
            }));
            // Initial validation if needed on data load (e.g., for existing invalid data)
            // For now, validation triggers on user interaction or date range set.
        },
        setExamDateRange: (state, action) => {
            const { start_date, end_date } = action.payload;
            state.startDate = start_date ? new Date(start_date) : null;
            state.endDate = end_date ? new Date(end_date) : null;

            // When the date range changes, revalidate all existing entries' dates and times
            state.formData.forEach(item => {
                // Clear all existing validation messages before revalidating
                item.validation = {
                    start_time: null,
                    end_time: null,
                    clash: null,
                    dateValid: null,
                    date: null,
                    timeValid: null,
                    overallValid: null,
                };
            });
            state.formData.forEach((_, index) => {
                validateDate(state, index); // Re-validate date for each row
            });
            state.formData.forEach((_, index) => {
                validateRow(state, index); // Re-validate time and clashes for each row
            });

            // Update overall validity for all rows after revalidation
            state.formData.forEach(item => {
                item.validation.overallValid =
                    item.validation.dateValid === "Looks Good!" &&
                    item.validation.timeValid === "Looks good!";
            });

            // Check if all rows are valid and show a global success toast
            const allRowsValid = state.formData.every(item => item.validation.overallValid);
            if (allRowsValid && state.formData.length > 0) {
                toast.custom(<ToastSuccess title={"Timetable Valid!"} description={"All exam entries are valid with no clashes."} />);
            }
        },
        updateField: (state, action) => {
            const { index, field, value } = action.payload;
            state.formData[index] = {
                ...state.formData[index],
                [field]: value,
            };

            const currentRow = state.formData[index];

            // Duration calculation remains the same
            if (field === "start_time" || field === "end_time") {
                if (currentRow.start_time && currentRow.end_time) {
                    currentRow.duration = calculateDuration(currentRow.start_time, currentRow.end_time);
                } else {
                    currentRow.duration = "";
                }
            }

            // --- REFINED VALIDATION LOGIC BASED ON FIELD CHANGED ---

            if (field === "date") {
                // 1. Validate ONLY the current row's date
                // Clear only date-specific validation for the current row before validating
                currentRow.validation.date = null;
                currentRow.validation.dateValid = null;
                validateDate(state, index);

                // 2. Re-calculate overall validity for THIS row (combining existing time status with new date status)
                currentRow.validation.overallValid =
                    currentRow.validation.dateValid === "Looks Good!" &&
                    currentRow.validation.timeValid === "Looks good!";

                // No global revalidation or overall toast from here.
                // Time-related clash revalidation will only happen when time fields change.
            } else if (["start_time", "end_time"].includes(field)) {
                // 1. When time fields change, we need to revalidate ALL rows for clashes.
                // First, clear ALL time-related validation for ALL rows.
                state.formData.forEach(item => {
                    item.validation.start_time = null;
                    item.validation.end_time = null;
                    item.validation.clash = null;
                    item.validation.timeValid = null;
                    item.validation.overallValid = null; // Will be re-computed below
                });

                // 2. Re-run time validation (including clash checks) for ALL rows.
                state.formData.forEach((_, idx) => {
                    validateRow(state, idx);
                });

                // 3. After ALL time validations, update overallValid status for ALL rows.
                // This combines the *current* date validation results with the *newly calculated* time validation results.
                state.formData.forEach(item => {
                    item.validation.overallValid =
                        item.validation.dateValid === "Looks Good!" &&
                        item.validation.timeValid === "Looks good!";
                });

                // 4. Global success toast: Show only if ALL rows are now valid.
                const allRowsValid = state.formData.every(item => item.validation.overallValid);
                if (allRowsValid && state.formData.length > 0) {
                    toast.custom(<ToastSuccess title={"Timetable Valid!"} description={"All exam entries are valid with no clashes."} />);
                }
                // Error toasts for time/clash are handled within validateRow.
            }
        },
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------
// Validation Functions (modified for the new granular revalidation logic and toast strategy)
// ------------------------------------------------------------------------------------------------------------------------------------

const validateRow = (state, updatedIndex) => {
    const currentRow = state.formData[updatedIndex];
    const startTime = currentRow.start_time;
    const endTime = currentRow.end_time;
    const date = currentRow.date ? new Date(currentRow.date) : null;

    // No initial reset here, as updateField handles clearing relevant validation flags before calling.

    // If incomplete time/date data, mark as invalid for time validation part
    if (!startTime || !endTime || !currentRow.date) {
        currentRow.validation.timeValid = false; // Mark as invalid for overall time/clash logic
        // No toast for incompleteness here; UI should manage required fields.
        return;
    }

    // 1. Time Order Validation: start_time must be before end_time
    if (startTime >= endTime) {
        currentRow.validation.start_time = "Start time cannot be equal to or after end time!";
        currentRow.validation.end_time = "End time cannot be before or equal to start time!";
        currentRow.validation.clash = null; // Ensure clash is cleared if time order is issue
        currentRow.validation.timeValid = false;
        toast.custom(<ToastWarning title={"Time Order Error"} description={"Start time must be before end time for this entry!"} />);
        return; // Return early, as invalid time order makes clash checks irrelevant
    }

    // 2. Clash Detection: Check against other exams on the SAME DATE
    let clashFound = false;
    for (let i = 0; i < state.formData.length; i++) {
        if (i === updatedIndex) continue; // Skip comparing with itself

        const compareRow = state.formData[i];
        // Ensure the other row has valid date, start_time, and end_time for comparison
        if (!compareRow.date || !compareRow.start_time || !compareRow.end_time) continue;

        const compareDate = new Date(compareRow.date);

        // Check if the two rows are on the same day
        if (date && compareDate && isSameDay(date, compareDate)) {
            // Check for time overlap: (StartA < EndB AND EndA > StartB)
            if (startTime < compareRow.end_time && endTime > compareRow.start_time) {
                clashFound = true;
                // We don't need to explicitly set validation on compareRow here for clash,
                // as the outer loop in updateField will ensure validateRow is called for compareRow eventually.
            }
        }
    }

    // 3. Finalizing time validation
    if (clashFound) {
        currentRow.validation.clash = "Time slot clashes with another exam schedule.";
        currentRow.validation.start_time = null; // Clear individual time errors if clash is the main issue
        currentRow.validation.end_time = null;
        currentRow.validation.timeValid = false;
        toast.custom(<ToastWarning title={"Clash Detected!"} description={`Time slot for ${currentRow.course_name || 'this entry'} clashes with another exam on ${currentRow.date || 'its date'}!`} />);
    } else {
        currentRow.validation.clash = null; // Clear clash if it was there before
        currentRow.validation.start_time = null; // Clear previous individual time errors
        currentRow.validation.end_time = null;
        currentRow.validation.timeValid = "Looks good!";
        // No success toast here to avoid spam. Overall success toast is handled by updateField.
    }
};


const validateDate = (state, updatedIndex) => {
    const currentRow = state.formData[updatedIndex];
    const dateString = currentRow.date;
    const date = dateString ? new Date(dateString) : null;

    // No initial reset here, as updateField handles clearing relevant validation flags before calling.

    if (!dateString) {
        currentRow.validation.date = "Date cannot be empty."; // Explicit error for empty date
        currentRow.validation.dateValid = false;
        // No toast for empty date, as it's a basic requirement often handled by UI.
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to midnight

    // 1. Date cannot be before today
    if (date < today) {
        currentRow.validation.date = "The date cannot be before the current date!";
        currentRow.validation.dateValid = false;
        toast.custom(<ToastWarning title={"Date Error"} description={"The date cannot be before the current date!"} />);
        return;
    }

    // 2. Date must be within the defined exam date range
    if (state.startDate && state.endDate) {
        const effectiveStartDate = new Date(state.startDate);
        effectiveStartDate.setHours(0,0,0,0); // Normalize to start of day
        const effectiveEndDate = new Date(state.endDate);
        effectiveEndDate.setHours(0,0,0,0); // Normalize to start of day

        if (date < effectiveStartDate || date > effectiveEndDate) {
            currentRow.validation.date = `The date must be between ${effectiveStartDate.toISOString().split('T')[0]} and ${effectiveEndDate.toISOString().split('T')[0]}!`;
            currentRow.validation.dateValid = false;
            toast.custom(<ToastWarning title={"Date Out of Range"} description={`Date must be between ${effectiveStartDate.toISOString().split('T')[0]} and ${effectiveEndDate.toISOString().split('T')[0]}!`} />);
            return;
        }
    }

    // If all date checks pass
    currentRow.validation.date = null; // Clear any previous specific date error message
    currentRow.validation.dateValid = "Looks Good!";
    // No success toast here for individual date validation.
};

export const { setData, setExamDateRange, updateField } = examTimetableSlice.actions;
export default examTimetableSlice.reducer;