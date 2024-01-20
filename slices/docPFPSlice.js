import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ProfilePicture : ""
};

export const docPFPSlice = createSlice({
    name : "docPFP",
    initialState,
    reducers : {
        changeDocPFP : (state, action)=>{
            state.ProfilePicture = action.payload;
        },
        
    }

})

export const {changeDocPFP} = docPFPSlice.actions;
export default docPFPSlice.reducer;