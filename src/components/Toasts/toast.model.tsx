export interface Toast {
    id: string;
    text: string;
    type: string;
    duration?: number;
}

export const TOAST_DEFAULT_DURATION = 5000;
