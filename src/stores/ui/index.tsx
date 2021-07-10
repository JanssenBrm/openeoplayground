import { createSlice } from '@reduxjs/toolkit'
import { Toast, TOAST_DEFAULT_DURATION } from '../../components/Toasts/toast.model';
import {UiInteractionType, UiState, UI_INITIAL_STATE } from './ui.model'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setInteractionType: (state: UiState, action: {payload: UiInteractionType}) => {
            state.interaction = action.payload
        },
        addToast: (state: UiState, action: { payload: Toast}) => {
            state.toasts = [...state.toasts, {...action.payload, duration: TOAST_DEFAULT_DURATION}];
        },
        removeToast: (state: UiState, action: { payload: string}) => {
            state.toasts = state.toasts.filter((t: Toast) => t.id !== action.payload);
        }
    },
})

export const { setInteractionType, addToast, removeToast } = uiSlice.actions

export default uiSlice.reducer
