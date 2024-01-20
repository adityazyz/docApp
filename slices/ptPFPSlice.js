import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ProfilePicture : ""
};

export const ptPFPSlice = createSlice({
    name : "ptPFP",
    initialState,
    reducers : {
        changePtPFP : (state, action)=>{
            state.ProfilePicture = action.payload;
        },
        
    }

})

export const {changePtPFP} = ptPFPSlice.actions;
export default ptPFPSlice.reducer;