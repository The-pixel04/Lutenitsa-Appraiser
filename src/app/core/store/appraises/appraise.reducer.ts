import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";
import { Appraise } from "../../../models/appraise.model";
import * as AppraiseActions from './appraise.actions'


export interface AppraiseState {
    appraises: Appraise[],
    count: number,
    loading: boolean,
    error: HttpErrorResponse | null;
}

export const initialAppraiseState: AppraiseState = {
    appraises: [],
    count: 0,
    loading: false,
    error: null
}

export const appraiseReducer = createReducer(
    initialAppraiseState,
    on(AppraiseActions.loadAppraises, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AppraiseActions.loadAppraisesSuccess, (state, { appraises, count }) => ({
        ...state,
        appraises: appraises,
        count: count,
        loading: false
    })),
    on(AppraiseActions.loadAppraisesFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(AppraiseActions.loadAppraisesReset, state => ({
        ...state,
        appraises: [],
        count: 0,
        loading: false,
        error: null
    }))
)