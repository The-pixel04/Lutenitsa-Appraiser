import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { catchError, from, Observable, throwError } from "rxjs";
import { Appraise } from "../../models/appraise.model";


@Injectable({
    providedIn: 'root'
})

export class AppraiseService {
    private apiUrl = environment.apiUrl;
    private supaBase: SupabaseClient;

    constructor() {
        this.supaBase = createClient(this.apiUrl, environment.apiKey, {
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
                console.error('Error fetching appraises:', error);
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
                console.error('Error fetching appraise:', error);
                return throwError(() => error);
            })
        );
    }
}