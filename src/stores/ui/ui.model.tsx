import { Toast } from "../../components/Toasts/toast.model";

export interface UiState {
    interaction: UiInteractionType,
    toasts: Toast[]
}

export enum UiInteractionType {
    NONE,
    POLYGON
}

export const UI_INITIAL_STATE: UiState = {
    interaction: UiInteractionType.NONE,
    toasts: []
}

