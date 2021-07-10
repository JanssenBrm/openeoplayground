import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui';
import paramsReducer from './params';

export default configureStore({
    reducer: {
        ui: uiReducer,
        params: paramsReducer
    }
})
