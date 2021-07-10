import { createSlice } from '@reduxjs/toolkit'
import {UiInteractionType, UiState, UI_INITIAL_STATE } from './ui.model'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setInteractionType: (state: UiState, action: {payload: UiInteractionType}) => {
            state.interaction = action.payload
        },
    },
})

export const { setInteractionType } = uiSlice.actions

export default uiSlice.reducer
