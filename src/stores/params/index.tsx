import { createSlice } from '@reduxjs/toolkit'
import {OpenEOProcess, OpenEOProcessParam } from '../../interfaces/OpenEOProcess';
import { ParamsState, PARAMS_INITIAL_STATE } from './params.model';


export const paramsSlice = createSlice({
    name: 'params',
    initialState: PARAMS_INITIAL_STATE,
    reducers: {
        setFeature: (state: ParamsState, action: {payload: any}) => {
            state.feature = action.payload;
        },
        setProcess: (state: ParamsState, action: {payload: OpenEOProcess}) => {
            state.process = action.payload
        },
        updateProcessParam: (state: ParamsState, action: {payload: OpenEOProcessParam}) => {
            if (state.process) {
                state.process = {
                    ...state.process,
                    parameters: state.process.parameters.map((p: OpenEOProcessParam) => p.name === action.payload.name ? action.payload : p)
                }
            }
        }
    },
})

export const { setFeature, setProcess, updateProcessParam } = paramsSlice.actions

export default paramsSlice.reducer
