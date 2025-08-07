import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppraiseState } from "./appraise.reducer";

export const selectAppraiseState = createFeatureSelector<AppraiseState>('appraises');

export const selectAppraises = createSelector(
    selectAppraiseState,
    (state: AppraiseState) => state.appraises,
);

export const selectAppraisesCount = createSelector(
    selectAppraiseState,
    (state: AppraiseState) => state.count,
);

export const selectAppraiseLoading = createSelector(
    selectAppraiseState,
    (state: AppraiseState) => state.loading
);

export const selectAppraiseError = createSelector(
    selectAppraiseState,
    (state: AppraiseState) => state.error
)