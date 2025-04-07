import { createSlice } from "@reduxjs/toolkit";

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
                    timeValid: null
                }
            }));
        },
        setExamDateRange: (state, action) => {
            const { start_date, end_date } = action.payload;
            state.startDate = new Date(start_date);
            state.endDate = new Date(end_date);
        },
        updateField: (state, action) => {
            const { index, field, value } = action.payload;
            state.formData[index] = {
                ...state.formData[index],
                [field]: value,
            };

            if (field === "date") {
                validateDate(state, index);
            } else if (["start_time", "end_time"].includes(field)) {
                validateRow(state, index);
            }
        },
    }
});

const validateRow = (state, updatedIndex) => {
    const currentRow = state.formData[updatedIndex];
    const startTime = currentRow.start_time;
    const endTime = currentRow.end_time;
    const date = new Date(currentRow.date); // Fetch the date from currentRow

    // Initialize validation states for time checks only
    const validation = {
        start_time: null,
        end_time: null,
        clash: null,
        timeValid: null,
    };

    if (!startTime || !endTime || !currentRow.date) {
        return; // If incomplete data, exit early
    }

    if (startTime >= endTime) {
        validation.start_time = "Start time cannot be equal to or after end time!";
        validation.end_time = "End time cannot be before or equal to start time!";
        currentRow.validation = { ...currentRow.validation, ...validation }; // only update time related validation
        return;
    }

    let clashFound = false;
    for (let i = 0; i < state.formData.length; i++) {
        if (i !== updatedIndex) {
            const compareRow = state.formData[i];
            const compareDate = new Date(compareRow.date);
            if (compareDate.getTime() === date.getTime()) {
                if (
                    (startTime >= compareRow.start_time && startTime < compareRow.end_time) ||
                    (endTime > compareRow.start_time && endTime <= compareRow.end_time) ||
                    (startTime <= compareRow.start_time && endTime >= compareRow.end_time)
                ) {
                    clashFound = true;
                    validation.clash = "Time slot clashes with another exam schedule.";
                    compareRow.validation.clash = "Time slot clashes with another exam schedule.";
                }
            }
        }
    }

    if (clashFound) {
        validation.start_time = "Clash detected!";
        validation.end_time = "Clash detected!";
    } else {
        validation.timeValid = "Looks good!";
    }

    // Only update the validation part related to time, leaving date alone
    currentRow.validation = { ...currentRow.validation, ...validation };
};


const validateDate = (state, updatedIndex) => {
    const currentRow = state.formData[updatedIndex];
    const date = new Date(currentRow.date);

    currentRow.validation.date = null; 
    currentRow.validation.dateValid = null; 

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!currentRow.date) {
        return;
    }


    if (date < today) {
        currentRow.validation.date = "The date cannot be before the current date!";
        return;
    }

    if (state.startDate && state.endDate) {
        if (date < state.startDate || date > state.endDate) {
            currentRow.validation.date = `The date must be between ${state.startDate.toISOString().split('T')[0]} and ${state.endDate.toISOString().split('T')[0]}!`;
            return;
        }
    }

    currentRow.validation.dateValid = "Looks Good!";
};

export const { setData, setExamDateRange, updateField } = examTimetableSlice.actions;
export default examTimetableSlice.reducer;