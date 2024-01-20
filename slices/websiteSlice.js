import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  websiteColorDark : "#1B5A90",
  websiteColorLight : null,
  websiteName : null,
  websiteLogo : null,
  websiteFavicon : null,
};

export const websiteSlice = createSlice({
    name : "website",
    initialState,
    reducers : {
        changeWebsiteColor : (state, action)=>{
            state.websiteColorDark = action.payload.dark;
            state.websiteColorLight = action.payload.light;
        },
        changeWebsiteName : (state, action)=>{
            state.websiteName = action.payload;
        },
        changeWebsiteLogo : (state, action)=>{
            state.websiteLogo = action.payload;
        },
        changeWebsiteFavicon : (state, action) =>{
            state.websiteFavicon = action.payload;
        }
    }

})

export const {changeWebsiteColor, changeWebsiteName, changeWebsiteLogo,changeWebsiteFavicon} = websiteSlice.actions;
export default websiteSlice.reducer;