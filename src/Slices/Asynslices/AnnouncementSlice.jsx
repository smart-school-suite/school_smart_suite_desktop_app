import { createSlice } from "@reduxjs/toolkit";

const AnnouncementSlice = createSlice({
    name:"announcement",
    initialState:{
        title:"",
        content:"",
        status:"",
        published_at:"",
        category_id:"",
        label_id:"",
        tag_id:"",
        student_ids:[],
        preset_group_ids:[],
        parent_ids:[],
        school_admin_ids:[],
        teacher_ids:[],
        school_set_group_ids:[]
    },
    reducers:{
         
    }
})

export default AnnouncementSlice.reducer;