import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { createClient, SupabaseClient } from "@supabase/supabase-js";;
import { ErrorService } from "./error.service";
import { catchError, from, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CommentService {
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

    addComment(appraiseId: number, comment: string, userId: string, email:string): Observable<void> {
        return from(
            this.supaBase
                .from('comments')
                .insert([{ appraiseId, comment, userId, email }])
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