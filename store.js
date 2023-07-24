import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/categorySlice'

export const store = configureStore({
    reducer: {
        category : categorySlice,
    //   counter : counterReducer,
    //   cart : cartReducer,
    },  
  })