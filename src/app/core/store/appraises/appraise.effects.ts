import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppraiseService } from "../../services/appraise.service";
import * as AppraiseActions from './appraise.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()

export class AppraiseEffects {
    actions$ = inject(Actions);

    loadAppraises$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppraiseActions.loadAppraises),
            mergeMap(({ page, pageSize }) =>
                this.appraiseService.getAllAppraises(page, pageSize).pipe(
                    map(({ appraises, count }) =>
                        AppraiseActions.loadAppraisesSuccess({ appraises: appraises, count: count })
                    ),
                    catchError((error) =>
                        of(AppraiseActions.loadAppraisesFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(
        private appraiseService: AppraiseService
    ) { }
}