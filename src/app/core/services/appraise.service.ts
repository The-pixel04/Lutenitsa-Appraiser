import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { catchError, from, Observable, throwError } from "rxjs";
import { Appraise } from "../../models/appraise.model";
import { ErrorService } from "./error.service";


@Injectable({
    providedIn: 'root'
})

export class AppraiseService {
    private apiUrl = environment.apiUrl;
    private supaBase: SupabaseClient;
    private apiKey = environment.apiKey;
    private errorService = inject(ErrorService);

    constructor() {
        this.supaBase = createClient(this.apiUrl, this.apiKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: true,
                detectSessionInUrl: true
            }
        })
    }

    getAllAppraises(): Observable<Appraise[]> {
        return from(
            this.supaBase
                .from('appraises')
                .select('*')
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

    getAppraise(id: number): Observable<Appraise> {
        return from(
            this.supaBase
                .from('appraises')
                .select('*')
                .eq('id', id)
                .single()
                .then(res => {
                    if (res.error) throw res.error;
                    return res.data as Appraise;
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }

    getAppraisesByUserId(userId: string | undefined): Observable<Appraise[]> {
        return from(
            this.supaBase
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
            this.supaBase
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
            this.supaBase
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
            this.supaBase
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