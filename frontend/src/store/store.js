import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/userSlice.js'
import mediaReducer from '../slices/mediaSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
  }
})
export default store