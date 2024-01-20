import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value : null
};

export const userTypeSlice = createSlice({
    name : "userType",
    initialState,
    reducers : {
        changeUserType : (state, action)=>{
            state.value = action.payload;
        },
    }

})

export const {changeUserType} = userTypeSlice.actions;
export default userTypeSlice.reducer;