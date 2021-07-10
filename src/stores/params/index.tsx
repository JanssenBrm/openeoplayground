import { createSlice } from '@reduxjs/toolkit'
import { ParamsState, PARAMS_INITIAL_STATE } from './params.model';


export const paramsSlice = createSlice({
    name: 'params',
    initialState: PARAMS_INITIAL_STATE,
    reducers: {
        setFeature: (state: ParamsState, action: {payload: any}) => {
            state.feature = action.payload;
        },
    },
})

export const { setFeature } = paramsSlice.actions

export default paramsSlice.reducer
