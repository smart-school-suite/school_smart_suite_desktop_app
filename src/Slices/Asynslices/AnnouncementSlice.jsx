import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    content: "",
    status: "",
    published_at: "",
    category_id: "",
    label_id: "",
    tag_id: "",
    expires_at:"",
    student_target_Ids: [],
    parent_target_Ids: [],
    school_admin_target_ids: [],
    school_wide: false,
    teacher_target_ids: [],
};

const AnnouncementSlice = createSlice({
    name: "announcement",
    initialState,
    reducers: {
        setField: (state, action) => {
            const { fieldName, value } = action.payload;
            if (Object.prototype.hasOwnProperty.call(state, fieldName)) {
                state[fieldName] = value;
            } else {
                console.warn(`Attempted to set unknown field: ${fieldName}`);
            }
        },
        setTargetIds: (state, action) => {
            const { targetType, ids } = action.payload; 
            if (
                Object.prototype.hasOwnProperty.call(state, targetType) &&
                Array.isArray(state[targetType])
            ) {
                state[targetType] = ids;
            } else {
                console.warn(`Invalid targetType (${targetType}) or not an array for setTargetIds.`);
            }
        },
        resetAnnouncement: (state) => {
            Object.assign(state, initialState);
        },
    }
});

export const {
    setField,
    setTargetIds,
    resetAnnouncement
} = AnnouncementSlice.actions;

export default AnnouncementSlice.reducer;