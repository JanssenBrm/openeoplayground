import { UiState } from "./ui/ui.model";
import { ParamsState } from './params/params.model';

export interface AppStore {
    ui: UiState
    params: ParamsState
}
