import {OpenEOProcess } from "../../interfaces/OpenEOProcess";

export interface ParamsState {
    feature: any,
    process: OpenEOProcess | undefined
}

export const PARAMS_INITIAL_STATE: ParamsState = {
    feature: undefined,
    process: undefined
}

