import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    days: { value: [], error: "" },
    min_slot_length: { isValid: null, error: "", value: null },
    max_slot_length: { isValid: null, error: "", value: null },
    slot_increment: { isValid: null, error: "", value: null },
    start: { isValid: null, error: "", value: null },
    end: { isValid: null, error: "", value: null },
    min_day_slots: { isValid: null, error: "", value: null },
    max_day_slots: { isValid: null, error: "", value: null },
    min_week_slots: { isValid: null, error: "", value: null },
    max_week_slots: { isValid: null, error: "", value: null },
    consecutive_limit: { isValid: null, error: "", value: null },
    max_week_sessions: { isValid: null, error: "", value: null },
    min_gap: { isValid: null, error: "", value: null },
    max_courses_day: { isValid: null, error: "", value: null }
};

const autoGenTimetableSlice = createSlice({
    name: "autoGenTimetable",
    initialState,
    reducers: {
        updateValue: (state, action) => {
            const { key, field, value } = action.payload;
            if (state[key]) {
                state[key][field] = value;
            }
        },
        resetAll: () => initialState
    }
});

export const { updateValue, resetAll } = autoGenTimetableSlice.actions;
export default autoGenTimetableSlice.reducer;
