import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Appraise } from "../../../models/appraise.model";

export const loadAppraises = createAction('[Appraises] Load Appraises',
    props<{ page: number; pageSize: number }>()
);
export const loadAppraisesSuccess = createAction('[Appraises] Load Appraises Success',
    props<{ appraises:Appraise[] }>()
);

export const loadAppraisesFailure = createAction(
    '[Appraises] Load Appraises Failure',
    props<{ error: HttpErrorResponse | null }>()
);

export const loadAppraisesReset = createAction(
    '[Appraises] Load Appraises Reset'
);