import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  adminSidebarOpen : true,
  homeSidebarOpen : false,
//   sidebarMargin : true
};

export const sidebarSlice = createSlice({
    name : "sidebar",
    initialState,
    reducers : {
        closeHomeSidebar : (state)=>{
            state.homeSidebarOpen = false;
        },
        openHomeSidebar : (state)=>{
            state.homeSidebarOpen = true;
        },
        closeAdminSidebar : (state)=>{
            state.adminSidebarOpen = false;
        },
        openAdminSidebar : (state)=>{
            state.adminSidebarOpen = true;
        }
    }
})

export const {closeHomeSidebar, openHomeSidebar, closeAdminSidebar, openAdminSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;