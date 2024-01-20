import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ProfilePicture : ""
};

export const adminPFPSlice = createSlice({
    name : "adminPFP",
    initialState,
    reducers : {
        changeAdminPFP : (state, action)=>{
            state.ProfilePicture = action.payload;
        },
        
    }

})

export const {changeAdminPFP} = adminPFPSlice.actions;
export default adminPFPSlice.reducer;