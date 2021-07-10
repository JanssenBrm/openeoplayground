export interface UiState {
    interaction: UiInteractionType
}

export enum UiInteractionType {
    NONE,
    POLYGON
}

export const UI_INITIAL_STATE: UiState = {
    interaction: UiInteractionType.NONE
}

