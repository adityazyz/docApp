import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'
import profileStructureSlice from './slices/profileStructureSlice'

export const store = configureStore({
    reducer: {
        category : categorySlice,
        profileStructure : profileStructureSlice,
    //   counter : counterReducer,
    //   cart : cartReducer,
    },  
  })