import { configureStore } from '@reduxjs/toolkit'
import profileStructureSlice from './slices/profileStructureSlice'
import websiteSlice from './slices/websiteSlice'
import adminPFPSlice from './slices/adminPFPSlice'
import docPFPSlice from './slices/docPFPSlice'
import ptPFPSlice from './slices/ptPFPSlice'
import userTypeSlice from './slices/userType'
import sidebarSlice from './slices/sidebarSlice'

export const store = configureStore({
    reducer: {
        profileStructure : profileStructureSlice,
        website : websiteSlice,
        adminPFP : adminPFPSlice,
        userType : userTypeSlice,
        docPFP : docPFPSlice,
        ptPFP : ptPFPSlice,
        sidebar : sidebarSlice
    //   counter : counterReducer,
    //   cart : cartReducer,
    },  
  })