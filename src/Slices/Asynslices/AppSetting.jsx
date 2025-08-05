import { createSlice } from "@reduxjs/toolkit";
const appSettingSlice = createSlice({ 
     name:"appSetting",
     initialState:{
         pushNotification:false
     },
     reducers:{
         updatePushNotification:(state) => {
            state.pushNotification = !state.pushNotification;
         }
     }
 })

export const { updatePushNotification } = appSettingSlice.actions;
 export default appSettingSlice.reducer;