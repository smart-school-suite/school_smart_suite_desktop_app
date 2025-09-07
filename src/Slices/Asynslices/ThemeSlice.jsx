import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
     name:"theme",
     initialState:{
         darkMode:true,
     },
     reducers:{
        setDarkMode:(state) => {
             state.darkMode = !state.darkMode;
        }
     }
})
export const {setDarkMode} = ThemeSlice.actions;
export default ThemeSlice.reducer;