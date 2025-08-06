import { ActionReducerMap } from '@ngrx/store';
import * as fromAppraise from './appraises/appraise.reducer';

export interface AppSate {
    appraises: fromAppraise.AppraiseState;
}

export const reducers: ActionReducerMap<AppSate> = {
    appraises: fromAppraise.appraiseReducer
}