import { inject, Injectable } from "@angular/core";
import { catchError, forkJoin, from, map, Observable, throwError } from "rxjs";
import { Appraise } from "../../models/appraise.model";
import { ErrorService } from "./error.service";
import { ExtendedAppraise } from "../../models/extendedAppraise.model";
import { Comment } from "../../models/comment.model";
import { SupabaseService } from "./supabase.service";


@Injectable({
    providedIn: 'root'
})

export class AppraiseService {
    private errorService = inject(ErrorService);

    constructor(private supaBaseService: SupabaseService) {
    }

    getAllAppraises(page: number, pageSize: number): Observable<{ data: Appraise[], count: number }> {
        const fromNum = (page - 1) * pageSize;
        const to = fromNum + pageSize - 1;

        return from(
            this.supaBaseService.getClient()
                .from('appraises')
                .select('*', { count: 'exact' })
                .range(fromNum, to)
                .then(res => {
                    if (res.error) throw res.error;
                    return {
                        data: res.data as Appraise[],
                        count: res.count || 0
                    };
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    getAppraiseWithComments(id: number): Observable<ExtendedAppraise> {
        const appraise$ = from(
            this.supaBaseService.getClient()
                .from('appraises')
                .select('*')
                .eq('id', id)
                .single()
                .then(res => {
                    if (res.error) throw res.error;
                    return res.data as Appraise;
                })
        );

        const comments$ = from(
            this.supaBaseService.getClient()
                .from('comments')
                .select('*')
                .eq('appraiseId', id)
                .order('created_at', { ascending: false })
                .then(res => {
                    if (res.error) throw res.error;
                    return res.data as Comment[];
                })
        );

        return forkJoin([appraise$, comments$]).pipe(
            map(([appraise, comments]) => ({ ...appraise, comments: comments ?? [] })),
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    getAppraisesByUserId(userId: string | undefined): Observable<Appraise[]> {
        return from(
            this.supaBaseService.getClient()
                .from('appraises')
                .select('*')
                .eq('user_id', userId)
                .then(res => {
                    if (res.error) throw res.error;
                    return res.data as Appraise[];
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    createAppraise(appraise: Appraise): Observable<void> {
        return from(
            this.supaBaseService.getClient()
                .from('appraises')
                .insert(appraise)
                .then(res => {
                    if (res.error) throw res.error;
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    updateAppraise(id: number, appraise: Appraise): Observable<void> {
        return from(
            this.supaBaseService.getClient()
                .from('appraises')
                .update(appraise)
                .eq('id', id)
                .then(res => {
                    if (res.error) throw res.error;
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    deleteAppraise(id: number): Observable<void> {
        return from(
            this.supaBaseService.getClient()
                .from('appraises')
                .delete()
                .eq('id', id)
                .select()
                .then(res => {
                    if (res.error) throw res.error;
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }
}